'use client'

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import OurExpertise from '@/components/OurExpertise'
import Technologies from '@/components/Technologies'
import HowWeWork from '@/components/HowWeWork'
import PastProjects from '@/components/PastProjects'
import IndustriesWeServe from '@/components/IndustriesWeServe'
import Statistics from '@/components/Statistics'
import ClientSlider from '@/components/ClientSlider'
import ContactUs from '@/components/ContactUs'

function HomeContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [successType, setSuccessType] = useState<'consultation' | 'quote' | 'login' | 'logout' | null>(null)

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash
    
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname])

  useEffect(() => {
    // Check for success parameters from both searchParams and URL (for better reliability)
    const consultation = searchParams.get('consultation') || new URLSearchParams(window.location.search).get('consultation')
    const quote = searchParams.get('quote') || new URLSearchParams(window.location.search).get('quote')
    const login = searchParams.get('login') || new URLSearchParams(window.location.search).get('login')
    const logout = searchParams.get('logout') || new URLSearchParams(window.location.search).get('logout')
    
    if (consultation === 'success') {
      setSuccessType('consultation')
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace('/', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setSuccessType(null)
      }, 5000)
      return () => clearTimeout(timer)
    } else if (quote === 'success') {
      setSuccessType('quote')
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace('/', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setSuccessType(null)
      }, 5000)
      return () => clearTimeout(timer)
    } else if (login === 'success') {
      setSuccessType('login')
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace('/', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setSuccessType(null)
      }, 5000)
      return () => clearTimeout(timer)
    } else if (logout === 'success') {
      setSuccessType('logout')
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace('/', { scroll: false })
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setSuccessType(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-transparent">
      {/* Success Notification - Fixed at top, below header with spacing */}
      {showSuccess && (
        <div className="fixed top-32 left-0 right-0 z-[60] px-4 sm:px-6 lg:px-8 animate-slide-down">
          <div className="max-w-7xl mx-auto">
            <div className="backdrop-blur-xl bg-green-50/95 dark:bg-green-900/95 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-green-200 dark:border-green-800 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {successType === 'logout' ? 'Logged Out Successfully!' : 'Successfully!'}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {successType === 'consultation' 
                      ? "We've received your consultation request. Our team will contact you soon to confirm the details."
                      : successType === 'quote'
                      ? "We've received your quote request. Our team will contact you soon with a detailed quote."
                      : successType === 'login'
                      ? "You have been successfully logged in. Welcome back!"
                      : successType === 'logout'
                      ? "You have been successfully logged out. Thank you for using our services!"
                      : ''
                    }
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuccess(false)
                    setSuccessType(null)
                  }}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  aria-label="Close notification"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Hero />
      <Statistics />
      <ClientSlider />
      <AboutUs />
      <OurExpertise />
      <Technologies />
      <HowWeWork />
      <PastProjects />
      <IndustriesWeServe />
      <ContactUs />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
