'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI, UserData } from '@/lib/api'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: { email: string; name: string; id?: number; full_name?: string; is_superuser?: boolean; is_staff?: boolean } | null
  setUser: (user: { email: string; name: string; id?: number; full_name?: string; is_superuser?: boolean; is_staff?: boolean } | null) => void
  login: (email: string, name: string, userData?: UserData) => void
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string; id?: number; full_name?: string; is_superuser?: boolean; is_staff?: boolean } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status from backend API
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        const response = await authAPI.checkAuth()
        
        if (response.authenticated && response.user) {
          setIsAuthenticated(true)
          const userObj = {
            email: response.user.email,
            name: response.user.full_name || `${response.user.first_name} ${response.user.last_name}`.trim() || response.user.email.split('@')[0],
            id: response.user.id,
            full_name: response.user.full_name,
            is_superuser: response.user.is_superuser || false,
            is_staff: response.user.is_staff || false
          }
          setUser(userObj)
          // Also update localStorage for consistency
          try {
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('user', JSON.stringify(userObj))
          } catch (storageError) {
            // Ignore localStorage errors (e.g., in private browsing)
            console.warn('Failed to save to localStorage:', storageError)
          }
        } else {
          setIsAuthenticated(false)
          setUser(null)
          try {
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('user')
          } catch (storageError) {
            // Ignore localStorage errors
            console.warn('Failed to remove from localStorage:', storageError)
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
        // Fallback to localStorage if API call fails (only on client)
        if (typeof window !== 'undefined') {
          try {
            const authStatus = localStorage.getItem('isAuthenticated')
            const userData = localStorage.getItem('user')
            
            if (authStatus === 'true' && userData) {
              try {
                const parsedUser = JSON.parse(userData)
                setIsAuthenticated(true)
                setUser(parsedUser)
              } catch (parseError) {
                console.error('Error parsing user data:', parseError)
                try {
                  localStorage.removeItem('isAuthenticated')
                  localStorage.removeItem('user')
                } catch (storageError) {
                  // Ignore localStorage errors
                }
              }
            }
          } catch (storageError) {
            // Ignore localStorage errors
            console.warn('Failed to access localStorage:', storageError)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (email: string, name: string, userData?: UserData) => {
    setIsAuthenticated(true)
    const userObj = {
      email,
      name,
      id: userData?.id,
      full_name: userData?.full_name || name,
      is_superuser: userData?.is_superuser || false,
      is_staff: userData?.is_staff || false
    }
    setUser(userObj)
    // Only save to localStorage on client side
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(userObj))
      } catch (storageError) {
        // Ignore localStorage errors (e.g., in private browsing)
        console.warn('Failed to save to localStorage:', storageError)
      }
    }
  }

  const logout = async () => {
    try {
      // Call logout API first to clear server session
      console.log('Calling logout API...')
      const response = await authAPI.logout()
      
      if (response.success) {
        console.log('Logged out successfully from server:', response.message)
      } else {
        console.warn('Logout API response indicates failure:', response.message)
      }
    } catch (apiError) {
      // Log error but continue with local logout
      console.error('Logout API error:', apiError)
    } finally {
      // Always clear local state regardless of API call result
      setIsAuthenticated(false)
      setUser(null)
      // Only clear localStorage on client side
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('user')
        } catch (storageError) {
          // Ignore localStorage errors
          console.warn('Failed to remove from localStorage:', storageError)
        }
      }
      console.log('Local state cleared')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

