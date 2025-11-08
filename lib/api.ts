/**
 * API Utility for making HTTP requests to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// CSRF token cache
let csrfToken: string | null = null;

/**
 * Get CSRF token from backend
 */
async function getCsrfToken(): Promise<string | null> {
  if (csrfToken) {
    return csrfToken;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/csrf-token/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      csrfToken = data.csrfToken || null;
      return csrfToken;
    }
  } catch (error) {
    console.error('Error getting CSRF token:', error);
  }

  return null;
}

/**
 * Generic API request function
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Get CSRF token for POST/PUT/DELETE/PATCH requests
  const method = options.method || 'GET';
  const needsCsrf = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase());
  
  if (needsCsrf && !csrfToken) {
    csrfToken = await getCsrfToken();
  }

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add CSRF token to headers if available
  if (csrfToken && needsCsrf) {
    defaultHeaders['X-CSRFToken'] = csrfToken;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Include cookies for session-based authentication
  };

  try {
    console.log('Making API request to:', url);
    let response = await fetch(url, config);
    
    console.log('API response status:', response.status, response.statusText);
    console.log('API response ok:', response.ok);
    
    // Read response as text first (we can only read the body once)
    let responseText = await response.text();
    console.log('API response text (raw):', responseText);
    
    let data: any = {};
    if (responseText) {
      try {
        // Try to parse as JSON
        data = JSON.parse(responseText);
        console.log('API response data (parsed JSON):', data);
      } catch (jsonError) {
        // If response is not JSON, create error response with the text
        console.error('Failed to parse JSON response:', jsonError);
        console.error('Response text:', responseText);
        
        // Check if it's a CSRF error even though it's not JSON
        const isCsrfErrorText = responseText.includes('CSRF') || responseText.includes('csrf');
        if (response.status === 403 && needsCsrf && isCsrfErrorText) {
          // Try to get CSRF token and retry
          csrfToken = null;
          csrfToken = await getCsrfToken();
          if (csrfToken) {
            const retryConfig: RequestInit = {
              ...options,
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                ...options.headers,
              },
              credentials: 'include',
            };
            const retryResponse = await fetch(url, retryConfig);
            const retryText = await retryResponse.text();
            if (retryText) {
              try {
                const retryData = JSON.parse(retryText);
                if (retryResponse.ok) {
                  return { success: true, ...retryData };
                }
                // Update response and data for error handling
                response = retryResponse;
                responseText = retryText;
                data = retryData;
              } catch (e) {
                return {
                  success: false,
                  errors: { general: [retryText] },
                  message: retryText,
                };
              }
            }
          }
        }
        
        return {
          success: false,
          errors: {
            general: [responseText || `Error: ${response.status} ${response.statusText}`],
          },
          message: responseText || `Error: ${response.status} ${response.statusText}`,
        };
      }
    }

    // Handle CSRF token errors - refresh token and retry once
    const isCsrfError = response.status === 403 && needsCsrf && (
      (data.detail && (typeof data.detail === 'string' && (data.detail.includes('CSRF') || data.detail.includes('csrf')))) ||
      (responseText && (responseText.includes('CSRF') || responseText.includes('csrf')))
    );
    
    if (isCsrfError) {
      console.log('CSRF token error detected, refreshing token...');
      csrfToken = null; // Clear cached token
      csrfToken = await getCsrfToken(); // Get new token
      
      if (csrfToken) {
        // Retry the request with new token
        console.log('Retrying request with new CSRF token...');
        const retryHeaders: HeadersInit = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };
        
        const retryConfig: RequestInit = {
          ...options,
          headers: {
            ...retryHeaders,
            ...options.headers,
          },
          credentials: 'include',
        };
        
        const retryResponse = await fetch(url, retryConfig);
        const retryText = await retryResponse.text();
        let retryData: any = {};
        
        if (retryText) {
          try {
            retryData = JSON.parse(retryText);
          } catch (e) {
            retryData = { detail: retryText };
          }
        }
        
        if (retryResponse.ok) {
          return {
            success: true,
            ...retryData,
          };
        }
        // If retry also fails, update response and data for error handling
        response = retryResponse;
        responseText = retryText;
        data = retryData;
      }
    }

    if (!response.ok) {
      console.error('API error response:', {
        status: response.status,
        statusText: response.statusText,
        data: data,
      });
      
      // Handle different error response formats
      let errors = {};
      let message = '';
      
      if (data.errors) {
        // DRF format: {errors: {field: [error1, error2]}}
        errors = data.errors;
        // Extract first error message if available
        const firstErrorKey = Object.keys(data.errors)[0];
        if (firstErrorKey) {
          const firstError = data.errors[firstErrorKey];
          if (Array.isArray(firstError)) {
            message = firstError[0];
          } else if (typeof firstError === 'string') {
            message = firstError;
          } else {
            message = JSON.stringify(firstError);
          }
        }
      } else if (data.message) {
        // Simple message format
        message = data.message;
        errors = { general: [data.message] };
      } else if (data.detail) {
        // DRF detail field
        message = data.detail;
        errors = { general: [data.detail] };
      } else {
        // Fallback
        message = `Error: ${response.status} ${response.statusText}`;
        errors = { general: [message] };
      }
      
      return {
        success: false,
        errors: errors,
        message: message || `Error: ${response.status} ${response.statusText}`,
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error: any) {
    console.error('API request error:', error);
    console.error('Error stack:', error.stack);
    return {
      success: false,
      errors: {
        general: [error.message || 'Network error. Please check your connection and try again.'],
      },
      message: error.message || 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Contact Us API
 */
export interface ContactUsData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const contactUsAPI = {
  submit: async (data: ContactUsData): Promise<ApiResponse> => {
    return apiRequest('/portfolio/contact-us/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Authentication API
 */
export interface LoginData {
  identifier: string; // Email, username, or phone number
  password: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email_verified?: boolean;
}

export interface LoginResponse extends ApiResponse {
  user?: UserData;
}

export const authAPI = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    return apiRequest<UserData>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterData): Promise<ApiResponse> => {
    return apiRequest('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse> => {
    return apiRequest('/auth/forgot-password/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyEmail: async (token: string): Promise<ApiResponse> => {
    return apiRequest(`/auth/verify-email/${token}/`, {
      method: 'GET',
    });
  },

  resendVerificationEmail: async (email: string): Promise<ApiResponse> => {
    return apiRequest('/auth/resend-verification-email/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token: string, data: { new_password: string; confirm_password: string }): Promise<ApiResponse> => {
    return apiRequest(`/auth/reset-password/${token}/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getCsrfToken: async (): Promise<string | null> => {
    return getCsrfToken();
  },

  checkAuth: async (): Promise<{ authenticated: boolean; user?: UserData }> => {
    try {
      const response = await apiRequest('/auth/check/', {
        method: 'GET',
      });
      
      // The check auth endpoint returns authenticated field directly
      if ((response as any).authenticated === true && (response as any).user) {
        return {
          authenticated: true,
          user: (response as any).user as UserData,
        };
      }
      
      return {
        authenticated: false,
      };
    } catch (error) {
      console.error('Error checking auth:', error);
      return {
        authenticated: false,
      };
    }
  },

  logout: async (): Promise<ApiResponse> => {
    return apiRequest('/auth/logout/', {
      method: 'POST',
    });
  },
};

// Portfolio/Quote API
export interface QuoteRequestData {
  full_name: string
  email: string
  mobile_number: string
  company_name: string
  service_required: string
  project_description: string
}

export interface ConsultationRequestData {
  consultation_date: string  // YYYY-MM-DD format
  start_time: string  // HH:MM format
  end_time: string  // HH:MM format
  full_name: string
  email: string
  phone_number?: string
  company_organization_name?: string
  consultation_topic: string
  detailed_description: string
}

export interface ClientSlideData {
  id: number
  client_name: string
  logo: string | null
  logo_url: string | null
  created_at: string
  updated_at: string
}

export interface StatisticTileData {
  id: number
  key: string
  title: string
  value: string
  icon: string | null
  icon_url: string | null
  created_at: string
  updated_at: string
}

export interface ProjectData {
  id: number
  title: string
  description: string
  project_tag: string
  project_url: string | null
  cover_image: string | null
  cover_image_url: string | null
  created_at: string
  updated_at: string
}

export const portfolioAPI = {
  submitQuoteRequest: async (data: QuoteRequestData): Promise<ApiResponse> => {
    return apiRequest('/portfolio/quote-request/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  submitConsultationRequest: async (data: ConsultationRequestData): Promise<ApiResponse> => {
    return apiRequest('/portfolio/consultation-booking/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getClients: async (): Promise<{ success: boolean; clients: ClientSlideData[] }> => {
    try {
      const response = await apiRequest<{ clients: ClientSlideData[] }>('/portfolio/clients/', {
        method: 'GET',
      });
      if (response.success && response.clients) {
        return { success: true, clients: response.clients };
      }
      return { success: false, clients: [] };
    } catch (error) {
      console.error('Error fetching clients:', error);
      return { success: false, clients: [] };
    }
  },

  getStatistics: async (): Promise<{ success: boolean; statistics: StatisticTileData[] }> => {
    try {
      const response = await apiRequest<{ statistics: StatisticTileData[] }>('/portfolio/statistics/', {
        method: 'GET',
      });
      if (response.success && response.statistics) {
        return { success: true, statistics: response.statistics };
      }
      return { success: false, statistics: [] };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return { success: false, statistics: [] };
    }
  },

  getProjects: async (): Promise<{ success: boolean; projects: ProjectData[] }> => {
    try {
      const response = await apiRequest<{ projects: ProjectData[] }>('/portfolio/projects/', {
        method: 'GET',
      });
      if (response.success && response.projects) {
        return { success: true, projects: response.projects };
      }
      return { success: false, projects: [] };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, projects: [] };
    }
  },
};

export default apiRequest;

