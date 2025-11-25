'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import QuoteModal from './QuoteModal'
import LogoutModal from './LogoutModal'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const authDropdownRef = useRef<HTMLDivElement>(null)

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // If we're not on home page, navigate to home with hash
      if (pathname !== '/') {
        router.push(`/${href}`)
        // Wait for navigation, then scroll
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 300)
      } else {
        // If we're on home page, just scroll to section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else {
      // Regular navigation
      router.push(href)
    }
  }

  const handleFreeConsultation = () => {
    if (!isAuthenticated) {
      router.push('/login')
      setIsMenuOpen(false)
    } else {
      router.push('/book-consultation')
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close auth dropdown when clicking outside
  useEffect(() => {
    if (!isAuthDropdownOpen || isLogoutModalOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Check if click is on logout button or its children
      const isLogoutButton = target.closest('button[data-logout-button]')
      if (isLogoutButton) {
        console.log('Click detected on logout button, not closing dropdown')
        return // Don't close dropdown if clicking logout button
      }
      
      // Check if click is on a Link (login/signup) - allow navigation
      const isLink = target.closest('a[href]')
      if (isLink && authDropdownRef.current && authDropdownRef.current.contains(isLink)) {
        console.log('Click detected on link, allowing navigation')
        // Close dropdown but allow link navigation to proceed
        setIsAuthDropdownOpen(false)
        return
      }
      
      // Only close if click is completely outside the dropdown
      if (authDropdownRef.current && !authDropdownRef.current.contains(target)) {
        setIsAuthDropdownOpen(false)
      }
    }

    // Use click event instead of mousedown to allow Link navigation
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [isAuthDropdownOpen, isLogoutModalOpen])

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log('Logout button clicked - handleLogoutClick called')
    // Open modal immediately - don't close dropdown, modal will overlay it
    setIsLogoutModalOpen(true)
    // Close dropdown after a brief moment to avoid visual overlap
    setTimeout(() => {
      setIsAuthDropdownOpen(false)
    }, 50)
  }

  const handleLogoutMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    console.log('Logout button mousedown - opening modal')
    // Open modal on mousedown to ensure it works before any other handlers
    setIsLogoutModalOpen(true)
    setTimeout(() => {
      setIsAuthDropdownOpen(false)
    }, 50)
  }

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true)
      
      // Call logout API first to clear server session
      await logout()
      
      // Show success message briefly
      setTimeout(() => {
        setIsLoggingOut(false)
        setIsLogoutModalOpen(false)
        // Force a full page reload to ensure all state is cleared, with logout success parameter
        window.location.href = '/?logout=success'
      }, 1000)
    } catch (error) {
      console.error('Error during logout:', error)
      setIsLoggingOut(false)
      // Still close modal and redirect even if there's an error, with logout success parameter
      setIsLogoutModalOpen(false)
      window.location.href = '/?logout=success'
    }
  }

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false)
  }

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 sticky top-0 z-50 transition-all duration-300 w-full ${
      scrolled ? 'shadow-lg dark:shadow-gray-900' : ''
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-3 items-center h-20 w-full">
          {/* Left Side - Logo and MSME Badge - Leftmost */}
          <div className="flex items-center space-x-3 justify-start">
            <Link href="/" className="flex items-center group">
              <img 
                src="/logos/logo only.png" 
                alt="Electrocom Logo" 
                className="h-10 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-300"
              />
              <img 
                src="/logos/Electrocom Text.png" 
                alt="Electrocom" 
                className="h-6 w-auto object-contain ml-2 hidden sm:block brightness-0 invert group-hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
            <div className="hidden md:flex items-center bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-full px-3 py-1 animate-pulse-slow">
              <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-300">MSME Certified</span>
            </div>
          </div>

          {/* Center - Navigation Menu - Perfectly Centered */}
          <nav className="hidden lg:flex items-center justify-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (servicesTimeoutRef.current) {
                  clearTimeout(servicesTimeoutRef.current)
                  servicesTimeoutRef.current = null
                }
                setIsServicesOpen(true)
              }}
              onMouseLeave={() => {
                servicesTimeoutRef.current = setTimeout(() => {
                  setIsServicesOpen(false)
                }, 150)
              }}
            >
              <button
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group flex items-center gap-1 py-2"
              >
                Services
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 pt-1 w-56 z-50"
                  onMouseEnter={() => {
                    if (servicesTimeoutRef.current) {
                      clearTimeout(servicesTimeoutRef.current)
                      servicesTimeoutRef.current = null
                    }
                  }}
                >
                  <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl py-2">
                    <Link
                      href="/services/software-solutions"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      Software Solutions
                    </Link>
                    <Link
                      href="/services/hardware-maintenance"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      Hardware Maintenance
                    </Link>
                    <Link
                      href="/services/network-solutions"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      Network Solutions
                    </Link>
                    <Link
                      href="/services/manpower-supply"
                      className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      Manpower Supply
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/projects" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button
              onClick={() => handleNavigation('#contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Side - Action Buttons - Rightmost */}
          <div className="hidden lg:flex items-center space-x-4 justify-end">
            <button
              onClick={handleFreeConsultation}
              className="px-4 py-2 rounded-xl bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Free Consultation</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Get a Quote</span>
            </button>
            
            {/* Authentication Dropdown */}
            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                aria-label="User menu"
              >
                {isAuthenticated ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </button>
              
              {isAuthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden animate-slide-down">
                  {isAuthenticated ? (
                    <>
                      {user && (
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user.full_name || user.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      )}
                      {user?.is_superuser && (
                        <a
                          href="https://console.electrocomsolutions.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setIsAuthDropdownOpen(false)
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation()
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Console</span>
                        </a>
                      )}
                      <button
                        type="button"
                        data-logout-button="true"
                        onMouseDown={(e) => {
                          console.log('MOUSEDOWN on logout button - DIRECT HANDLER')
                          e.preventDefault()
                          e.stopPropagation()
                          handleLogoutMouseDown(e)
                        }}
                        onClick={(e) => {
                          console.log('CLICK on logout button - DIRECT HANDLER')
                          e.preventDefault()
                          e.stopPropagation()
                          handleLogoutClick(e)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 ${user?.is_superuser ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={(e) => {
                          console.log('Login link clicked')
                          setIsAuthDropdownOpen(false)
                          // Allow default navigation to proceed
                        }}
                        onMouseDown={(e) => {
                          // Prevent dropdown handler from interfering
                          e.stopPropagation()
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        onClick={(e) => {
                          console.log('Signup link clicked')
                          setIsAuthDropdownOpen(false)
                          // Allow default navigation to proceed
                        }}
                        onMouseDown={(e) => {
                          // Prevent dropdown handler from interfering
                          e.stopPropagation()
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Override grid on mobile */}
          <div className="col-start-3 col-end-4 flex items-center justify-end space-x-2 lg:hidden">
            {/* Mobile Auth Dropdown */}
            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                aria-label="User menu"
              >
                {isAuthenticated ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </button>
              
              {isAuthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden animate-slide-down">
                  {isAuthenticated ? (
                    <>
                      {user && (
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user.full_name || user.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      )}
                      {user?.is_superuser && (
                        <a
                          href="https://console.electrocomsolutions.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            setIsAuthDropdownOpen(false)
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation()
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Console</span>
                        </a>
                      )}
                      <button
                        type="button"
                        data-logout-button="true"
                        onMouseDown={(e) => {
                          console.log('MOUSEDOWN on logout button - DIRECT HANDLER')
                          e.preventDefault()
                          e.stopPropagation()
                          handleLogoutMouseDown(e)
                        }}
                        onClick={(e) => {
                          console.log('CLICK on logout button - DIRECT HANDLER')
                          e.preventDefault()
                          e.stopPropagation()
                          handleLogoutClick(e)
                        }}
                        className={`w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2 ${user?.is_superuser ? 'border-t border-gray-200 dark:border-gray-700' : ''}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={(e) => {
                          console.log('Login link clicked (mobile)')
                          setIsAuthDropdownOpen(false)
                          // Allow default navigation to proceed
                        }}
                        onMouseDown={(e) => {
                          // Prevent dropdown handler from interfering
                          e.stopPropagation()
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        onClick={(e) => {
                          console.log('Signup link clicked (mobile)')
                          setIsAuthDropdownOpen(false)
                          // Allow default navigation to proceed
                        }}
                        onMouseDown={(e) => {
                          // Prevent dropdown handler from interfering
                          e.stopPropagation()
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <div className="flex items-center mb-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-full px-3 py-1 w-fit">
              <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-300">MSME Certified</span>
            </div>
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  handleNavigation('/')
                  setIsMenuOpen(false)
                }}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
              >
                Home
              </button>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 flex items-center justify-between w-full"
                >
                  <span>Services</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      href="/services/software-solutions"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      Software Solutions
                    </Link>
                    <Link
                      href="/services/hardware-maintenance"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      Hardware Maintenance
                    </Link>
                    <Link
                      href="/services/network-solutions"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      Network Solutions
                    </Link>
                    <Link
                      href="/services/manpower-supply"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                      className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                    >
                      Manpower Supply
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/projects" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <button
                onClick={() => {
                  handleNavigation('#contact')
                  setIsMenuOpen(false)
                }}
                className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2"
              >
                Contact
              </button>
            </nav>
            
            {/* Mobile Action Buttons */}
            <div className="flex flex-col space-y-3 mt-4">
              <button
                onClick={handleFreeConsultation}
                className="w-full px-4 py-2 rounded-xl bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Free Consultation</span>
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full px-6 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Get a Quote</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <LogoutModal 
          isOpen={isLogoutModalOpen} 
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
          isLoggingOut={isLoggingOut}
        />
      )}
    </header>
  )
}
