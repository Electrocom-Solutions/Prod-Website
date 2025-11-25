'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { authAPI } from '@/lib/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setFieldErrors({})

    if (!email) {
      setError('Please enter your email address')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await authAPI.forgotPassword({
        email: email.trim()
      })

      if (response.success) {
        // Password reset email sent successfully
        setIsSubmitted(true)
      } else {
        // Handle errors
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
          } else {
            setError('Failed to send password reset email. Please try again.')
          }
        } else {
          setError(response.message || 'Failed to send password reset email. Please try again.')
        }
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
    setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <SectionParticles particleCount={200} />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2">
                If an account with that email exists, a password reset link has been sent to
              </p>
              <p className="text-base md:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-6">
                {email}
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8">
                Please check your inbox and click on the link to reset your password. If you don't see the email, check your spam folder. The link will expire in 1 hour.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={async (e) => {
                  e.preventDefault()
                  setIsSubmitted(false)
                  setIsSubmitting(true)
                  setError('')
                  // Resubmit the form
                  try {
                    const response = await authAPI.forgotPassword({
                      email: email.trim()
                    })
                    if (response.success) {
                      setIsSubmitted(true)
                    } else {
                      setError(response.message || 'Failed to send password reset email. Please try again.')
                    }
                  } catch (error) {
                    console.error('Resend password reset email error:', error)
                    setError('Network error. Please check your connection and try again.')
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="w-full px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Resend Email
              </button>
              <Link
                href="/login"
                className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
              Forgot Password?
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-sm md:text-base text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                  if (fieldErrors.email) {
                    setFieldErrors(prev => {
                      const newErrors = { ...prev }
                      delete newErrors.email
                      return newErrors
                    })
                  }
                }}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  fieldErrors.email 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none`}
                placeholder="your.email@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-sm md:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

