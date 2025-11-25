'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import SectionParticles from '@/components/SectionParticles'
import { useAuth } from '@/contexts/AuthContext'
import { authAPI } from '@/lib/api'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated, loading } = useAuth()
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [emailNotVerified, setEmailNotVerified] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState('')
  const [justLoggedIn, setJustLoggedIn] = useState(false)
  const [showPasswordResetSuccess, setShowPasswordResetSuccess] = useState(false)

  // Check for password reset success parameter
  useEffect(() => {
    const passwordReset = searchParams.get('passwordReset')
    if (passwordReset === 'success') {
      setShowPasswordResetSuccess(true)
      // Remove query parameter from URL
      router.replace('/login', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowPasswordResetSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  // Redirect to home if already authenticated (but not if we just logged in)
  useEffect(() => {
    if (!loading && isAuthenticated && !justLoggedIn) {
      router.replace('/')
    }
  }, [isAuthenticated, loading, router, justLoggedIn])

  // Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await authAPI.getCsrfToken()
      } catch (error) {
        console.error('Error fetching CSRF token:', error)
      }
    }
    fetchCsrfToken()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    setFormData(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }))
    setError('')
    
    // Clear field error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
    // Also clear email field error for backward compatibility
    if (fieldErrors['email']) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors['email']
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setFieldErrors({})
    setEmailNotVerified(false)
    setUserEmail('')

    try {
      const response = await authAPI.login({
        identifier: formData.identifier.trim(),
        password: formData.password
      })

      // Check for email verification error first (even if response.success is false)
      // Email verification is REQUIRED regardless of login method (email, username, or phone)
      if ((response.message && response.message.toLowerCase().includes('verify your email')) || 
          (response.user && response.user.email_verified === false)) {
        setEmailNotVerified(true)
        // Always use the email from the user object (backend returns it)
        const userEmail = response.user?.email || ''
        if (userEmail) {
          setUserEmail(userEmail)
        } else {
          // Fallback: if identifier looks like an email, use it
          setUserEmail(formData.identifier.includes('@') ? formData.identifier.trim() : '')
        }
        setError(response.message || 'Please verify your email address before logging in. Email verification is required regardless of how you login.')
        setIsSubmitting(false)
        return
      }

      if (response.success && response.user) {
        // Double check: email verification is required (should already be checked above)
        if (response.user.email_verified === false) {
          setEmailNotVerified(true)
          setUserEmail(response.user.email || '')
          setError('Please verify your email address before logging in. Email verification is required.')
      setIsSubmitting(false)
      return
    }

        // Login successful - email is verified
        const userData = response.user
        login(
          userData.email, 
          userData.full_name || `${userData.first_name} ${userData.last_name}`.trim() || userData.email.split('@')[0], 
          userData
        )
    
        // Set flag to prevent auto-redirect from overwriting our success redirect
        setJustLoggedIn(true)
        
        // Always redirect to home page with success message using window.location
        // This ensures the query parameter is preserved and the success message shows
        window.location.href = '/?login=success'
      } else {
        // Handle other errors
        if (response.errors) {
          const errors: Record<string, string> = {}
          Object.keys(response.errors).forEach(key => {
            if (Array.isArray(response.errors![key])) {
              errors[key] = response.errors![key][0]
            } else {
              errors[key] = response.errors![key] as string
            }
          })
          setFieldErrors(errors)
          
          // Set general error message
          if (response.message) {
            setError(response.message)
          } else if (errors.identifier || errors.password) {
            setError('Invalid identifier or password')
          } else {
            setError('Login failed. Please try again.')
          }
        } else {
          setError(response.message || 'Login failed. Please try again.')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
    setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render login form if already authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <SectionParticles particleCount={200} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
          {/* Password Reset Success Message */}
          {showPasswordResetSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 animate-slide-down">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm md:text-base text-green-600 dark:text-green-400 font-semibold">
                  Your password has been successfully reset! You can now sign in with your new password.
                </p>
                <button
                  onClick={() => setShowPasswordResetSuccess(false)}
                  className="ml-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
              <img 
                src="/logos/logo only.png" 
                alt="Electrocom Logo" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <img 
                src="/logos/Electrocom Text.png" 
                alt="Electrocom" 
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Welcome Back
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mb-6 p-4 rounded-xl border-2 ${
              emailNotVerified 
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <p className={`text-sm md:text-base text-center ${
                emailNotVerified 
                  ? 'text-yellow-800 dark:text-yellow-300' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {error}
              </p>
              {emailNotVerified && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">
                    We've sent a verification email to <strong>{userEmail}</strong>
                  </p>
                  
                  {/* Resend Success Message */}
                  {resendSuccess && (
                    <div className="mb-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 animate-slide-down">
                      <p className="text-sm text-green-700 dark:text-green-300 font-semibold flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Verification email sent successfully! Please check your inbox.
                      </p>
                    </div>
                  )}
                  
                  {/* Resend Error Message */}
                  {resendError && (
                    <div className="mb-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-slide-down">
                      <p className="text-sm text-red-700 dark:text-red-300 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {resendError}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                    <Link
                      href={`/verify-email?email=${encodeURIComponent(userEmail)}`}
                      className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors underline inline-flex items-center"
                    >
                      Verify Email
                    </Link>
                    <span className="text-yellow-700 dark:text-yellow-400 hidden sm:inline-block self-center">|</span>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!userEmail) {
                          setResendError('Email address is required to resend verification email.')
                          return
                        }

                        setIsResending(true)
                        setResendError('')
                        setResendSuccess(false)

                        try {
                          const response = await authAPI.resendVerificationEmail(userEmail)
                          
                          if (response.success) {
                            setResendSuccess(true)
                            setResendError('')
                            // Clear success message after 5 seconds
                            setTimeout(() => {
                              setResendSuccess(false)
                            }, 5000)
                          } else {
                            setResendError(response.message || 'Failed to resend verification email. Please try again.')
                            setResendSuccess(false)
                          }
                        } catch (error: any) {
                          console.error('Error resending verification email:', error)
                          setResendError('Network error. Please check your connection and try again.')
                          setResendSuccess(false)
                        } finally {
                          setIsResending(false)
                        }
                      }}
                      disabled={isResending || !userEmail}
                      className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
                    >
                      {isResending ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        'Resend Verification Email'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email, Username, or Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  fieldErrors.identifier 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none`}
                placeholder="Enter your email, username, or phone number"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                You can login with your email address, username, or phone number
              </p>
              {fieldErrors.identifier && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.identifier}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    fieldErrors.password 
                      ? 'border-red-500 dark:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0A9.973 9.973 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

