'use client'

import { useEffect } from 'react'

interface LogoutModalProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoggingOut?: boolean
}

export default function LogoutModal({ isOpen, onConfirm, onCancel, isLoggingOut = false }: LogoutModalProps) {
  useEffect(() => {
    if (isOpen) {
      console.log('LogoutModal opened')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }
  
  console.log('Rendering LogoutModal, isLoggingOut:', isLoggingOut)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md pointer-events-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
                {isLoggingOut ? 'Logging Out...' : 'Confirm Logout'}
              </h2>

              {/* Message */}
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
                {isLoggingOut 
                  ? 'Please wait while we sign you out from the server...'
                  : 'Are you sure you want to logout? You will need to sign in again to access your account.'
                }
              </p>

              {/* Loading Spinner (when logging out) */}
              {isLoggingOut && (
                <div className="flex flex-col items-center justify-center mb-6 space-y-4">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 dark:border-primary-400"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Logging out...
                  </p>
                </div>
              )}

              {/* Buttons */}
              {!isLoggingOut && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400 text-white font-semibold hover:from-red-700 hover:to-red-600 dark:hover:from-red-600 dark:hover:to-red-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

