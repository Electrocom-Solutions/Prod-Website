'use client'

import { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { authAPI } from '@/lib/api'

function VerifyEmailTokenContent() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token as string
  
  const [isVerifying, setIsVerifying] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (token) {
      handleVerification(token)
    } else {
      setError('Invalid verification link. No token provided.')
      setIsVerifying(false)
    }
  }, [token])

  const handleVerification = async (verificationToken: string) => {
    setIsVerifying(true)
    setError('')

    try {
      const response = await authAPI.verifyEmail(verificationToken)

      if (response.success) {
        setIsVerified(true)
        // Optionally extract email from response data if available
        if (response.data && typeof response.data === 'object' && 'email' in response.data) {
          setUserEmail((response.data as { email: string }).email)
        } else if (response.data && typeof response.data === 'object' && 'user' in response.data) {
          const user = (response.data as { user: { email: string } }).user
          if (user?.email) {
            setUserEmail(user.email)
          }
        }
      } else {
        setError(response.message || 'Invalid or expired verification link. Please request a new one.')
      }
    } catch (error) {
      console.error('Email verification error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  // Show verifying state
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <SectionParticles particleCount={200} />
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
            <div className="mb-6">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 dark:border-primary-400 mb-6"></div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                Verifying Email...
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show verification success state
  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <SectionParticles particleCount={200} />
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-400/10 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 animate-bounce">
                <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300">
                Email Verified!
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2">
                Your email address has been successfully verified.
              </p>
              {userEmail && (
                <p className="text-sm md:text-base text-primary-600 dark:text-primary-400 font-semibold mb-6">
                  {userEmail}
                </p>
              )}
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8">
                You can now sign in to your account and access all features.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/login"
                className="inline-block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Continue to Sign In
              </Link>
              
              <Link
                href="/"
                className="inline-block w-full px-6 py-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <SectionParticles particleCount={200} />
      
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-400/10 dark:bg-red-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Verification Failed
            </h1>
            <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-base md:text-lg text-red-600 dark:text-red-400 text-center">
                {error || 'Invalid or expired verification link. Please request a new one.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What can you do?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Request a new verification email</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Check if the link has expired (links expire after 24 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contact support if the problem persists</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Go to Sign In
              </Link>
              
              <Link
                href="/signup"
                className="block w-full px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
              >
                Back to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailTokenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailTokenContent />
    </Suspense>
  )
}

