'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import { portfolioAPI } from '@/lib/api'

export default function ClientSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollSpeed = useRef(0.5) // Reduced speed for smoother, slower scrolling
  const [clients, setClients] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fallback clients if API fails or returns empty
  const fallbackClients = [
    'Government of Rajasthan',
    'Chittorgarh District Hospital',
    'Rajasthan State Education Board',
    'Municipal Corporation Chittorgarh',
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Tata Consultancy Services',
    'Infosys Technologies',
    'Wipro Limited',
    'Tech Mahindra',
    'Larsen & Toubro',
    'Reliance Industries',
    'Adani Group',
    'Bharti Airtel',
    'Vodafone Idea',
    'Jio Platforms',
    'Amazon India',
    'Flipkart',
    'Zomato',
    'Swiggy',
    'Ola Cabs',
    'Uber India',
    'Paytm',
    'PhonePe',
    'Google India',
    'Microsoft India',
    'IBM India',
    'Oracle India'
  ]

  // Fetch clients from API
  useEffect(() => {
    // Set fallback clients immediately so slider can start
    setClients(fallbackClients)
    setIsLoading(false)
    
    const fetchClients = async () => {
      try {
        console.log('ClientSlider: Fetching clients from API...')
        const response = await portfolioAPI.getClients()
        console.log('ClientSlider: API response:', response)
        
        if (response && response.success && response.clients && Array.isArray(response.clients) && response.clients.length > 0) {
          console.log('ClientSlider: Processing', response.clients.length, 'clients')
          // Extract client names from API response
          const clientNames = response.clients
            .filter(client => client && client.client_name)
            .map(client => client.client_name)
          
          if (clientNames.length > 0) {
            console.log('ClientSlider: Setting clients:', clientNames)
            setClients(clientNames)
          } else {
            console.warn('ClientSlider: No valid client names found after filtering')
          }
        } else {
          console.warn('ClientSlider: No clients found in API response', response)
        }
        // If API fails or returns empty, keep using fallback clients
      } catch (error) {
        console.error('ClientSlider: Error fetching clients:', error)
        // Keep using fallback clients on error
      }
    }

    // Fetch clients after a short delay to avoid blocking initial render
    setTimeout(fetchClients, 100)
  }, [])

  // Duplicate clients multiple times for truly seamless infinite loop
  // We need enough copies to ensure smooth scrolling
  // Strategy: Start at the middle set, scroll forward, and reset to the same middle set
  // This makes the reset completely invisible since we're resetting to identical content
  const duplicatedClients = clients.length > 0 
    ? [...clients, ...clients, ...clients, ...clients, ...clients] 
    : []

  // Store the width of one set for seamless looping
  const singleSetWidthRef = useRef<number>(0)
  const isInitializedRef = useRef<boolean>(false)

  // Animation effect - restarts when clients change or hover/drag state changes
  useEffect(() => {
    // Don't animate if no clients, hovering, or dragging
    if (clients.length === 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      isInitializedRef.current = false
      return
    }

    // Wait for DOM to be ready
    const initializeAndStart = () => {
      const slider = sliderRef.current
      if (!slider) {
        // Retry if slider isn't ready yet
        setTimeout(initializeAndStart, 100)
      return
    }

    const animate = () => {
        const slider = sliderRef.current
        if (!slider || clients.length === 0 || isHovered || isDragging) {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
          }
          return
        }

        // Recalculate if needed (in case window was resized)
        if (singleSetWidthRef.current === 0) {
          const totalScrollWidth = slider.scrollWidth
          if (totalScrollWidth > 0) {
            singleSetWidthRef.current = totalScrollWidth / 5
            // Set initial position
            slider.scrollLeft = singleSetWidthRef.current
          }
        }

        const singleSetWidth = singleSetWidthRef.current
        const currentScroll = slider.scrollLeft
      
        // Ensure we have valid dimensions
        if (singleSetWidth <= 0) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }

        // Seamless infinite loop:
        const secondSetStart = singleSetWidth
        const secondSetEnd = singleSetWidth * 2

        if (currentScroll >= secondSetEnd - scrollSpeed.current) {
          // Reset to the start of the second set
          slider.scrollLeft = secondSetStart
      } else {
          // Continue scrolling forward
          slider.scrollLeft += scrollSpeed.current
      }
      
        // Continue animation loop
        animationRef.current = requestAnimationFrame(animate)
      }

      const startAnimation = () => {
        if (!isHovered && !isDragging && clients.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }
      }

      // Initialize: Calculate single set width and position at the start of the second set
      const initializeSlider = () => {
        if (!slider || clients.length === 0) return

        // Wait for DOM to fully render and calculate dimensions
        const checkDimensions = () => {
          if (!slider || clients.length === 0) return
          
          const totalScrollWidth = slider.scrollWidth
          
          // Check if we have valid scroll width (content must be rendered)
          if (totalScrollWidth <= 0) {
            // Retry after a short delay
            setTimeout(checkDimensions, 50)
            return
          }
          
          const singleSetWidth = totalScrollWidth / 5

          if (singleSetWidth > 0) {
            singleSetWidthRef.current = singleSetWidth
            
            // Start at the beginning of the second set (1 * singleSetWidth)
            slider.scrollLeft = singleSetWidth
            isInitializedRef.current = true
            
            // Start animation
            startAnimation()
          } else {
            // Retry if width calculation failed
            setTimeout(checkDimensions, 50)
          }
        }
        
        // Use requestAnimationFrame to ensure DOM is painted
        requestAnimationFrame(() => {
          setTimeout(checkDimensions, 50)
        })
      }

      // Initialize slider
      if (!isInitializedRef.current) {
        initializeSlider()
      } else {
        // If already initialized, just start animation
        startAnimation()
      }
    }

    // Start initialization
    initializeAndStart()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      // Don't reset isInitializedRef on cleanup - let it persist across re-renders
    }
  }, [isHovered, isDragging, clients.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    if (!sliderRef.current || clients.length === 0) {
      setIsDragging(false)
      return
    }
    
    // Adjust scroll position to maintain seamless loop after dragging
    const slider = sliderRef.current
    const totalScrollWidth = slider.scrollWidth
    const singleSetWidth = totalScrollWidth / 5
    const currentScroll = slider.scrollLeft
    
    // Ensure we stay within the second set for seamless looping
    // Second set is from singleSetWidth to 2*singleSetWidth
    const secondSetStart = singleSetWidth
    const secondSetEnd = singleSetWidth * 2
    
    if (singleSetWidth > 0) {
      if (currentScroll < secondSetStart) {
        // If dragged before second set, wrap to equivalent position in second set
        const offset = currentScroll % singleSetWidth
        slider.scrollLeft = secondSetStart + offset
      } else if (currentScroll >= secondSetEnd) {
        // If dragged past second set, wrap to equivalent position in second set
        const offset = (currentScroll - secondSetStart) % singleSetWidth
        slider.scrollLeft = secondSetStart + offset
      }
    }
    
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (!sliderRef.current || clients.length === 0) {
      setIsDragging(false)
      return
    }
    
    // Adjust scroll position to maintain seamless loop after dragging
    const slider = sliderRef.current
    const totalScrollWidth = slider.scrollWidth
    const singleSetWidth = totalScrollWidth / 5
    const currentScroll = slider.scrollLeft
    
    // Ensure we stay within the second set for seamless looping
    const secondSetStart = singleSetWidth
    const secondSetEnd = singleSetWidth * 2
    
    if (singleSetWidth > 0) {
      if (currentScroll < secondSetStart) {
        // If dragged before second set, wrap to equivalent position in second set
        const offset = currentScroll % singleSetWidth
        slider.scrollLeft = secondSetStart + offset
      } else if (currentScroll >= secondSetEnd) {
        // If dragged past second set, wrap to equivalent position in second set
        const offset = (currentScroll - secondSetStart) % singleSetWidth
        slider.scrollLeft = secondSetStart + offset
      }
    }
    
    setIsDragging(false)
  }

  return (
    <section 
      id="clients" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={120} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Our Clients
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Trusted By Industry Leaders
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            handleMouseLeave()
          }}
        >
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`
              flex gap-8 overflow-x-hidden scrollbar-hide
              ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            `}
            style={{
              scrollBehavior: 'auto', // Use auto for instant resets (seamless looping)
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {duplicatedClients.length > 0 ? (
              duplicatedClients.map((client, index) => (
              <div
                key={`${client}-${index}`}
                className="flex-shrink-0 backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 px-8 py-6 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 transform hover:scale-105 transition-transform duration-300"
              >
                <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  {client}
                </span>
              </div>
              ))
            ) : (
              // Fallback - show fallback clients if duplicatedClients is empty
              fallbackClients.map((client, index) => (
                <div
                  key={`fallback-${client}-${index}`}
                  className="flex-shrink-0 backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 px-8 py-6 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 transform hover:scale-105 transition-transform duration-300"
                >
                  <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {client}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

