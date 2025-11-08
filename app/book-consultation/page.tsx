'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { useAuth } from '@/contexts/AuthContext'
import { portfolioAPI, authAPI } from '@/lib/api'

// Custom Dropdown Component
interface CustomDropdownProps {
  id: string
  name: string
  value: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
  filterFn?: (option: string) => boolean
  required?: boolean
}

function CustomDropdown({ id, name, value, options, placeholder, onChange, filterFn, required }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  const filteredOptions = filterFn ? options.filter(filterFn) : options

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (option: string) => {
    onChange(option)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex])
      } else {
        setIsOpen(!isOpen)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
      buttonRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
      } else {
        setHighlightedIndex(prev => {
          const newIndex = prev < filteredOptions.length - 1 ? prev + 1 : prev
          // Scroll into view
          setTimeout(() => {
            itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
          }, 0)
          return newIndex
        })
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (isOpen) {
        setHighlightedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : -1
          // Scroll into view
          if (newIndex >= 0) {
            setTimeout(() => {
              itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }, 0)
          }
          return newIndex
        })
      }
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={buttonRef}
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-left flex items-center justify-between"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={required}
      >
        <span className={value ? '' : 'text-gray-500 dark:text-gray-400'}>
          {value || placeholder}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl max-h-60 overflow-auto">
          <ul
            ref={listRef}
            role="listbox"
            className="py-2"
            aria-label={placeholder}
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                No options available
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  ref={(el) => { itemRefs.current[index] = el }}
                  role="option"
                  aria-selected={value === option}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    value === option
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : highlightedIndex === index
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {value === option && (
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

// Custom Date Picker Component
interface CustomDatePickerProps {
  id: string
  name: string
  value: string
  minDate?: string
  onChange: (value: string) => void
  required?: boolean
}

function CustomDatePicker({ id, name, value, minDate, onChange, required }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedDate = value ? new Date(value) : null
  const minDateObj = minDate ? new Date(minDate) : null
  const initialMonth = selectedDate || minDateObj || new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1))
  const datePickerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Update current month when value changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }
  }, [selectedDate])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateDisabled = (date: Date): boolean => {
    if (minDateObj && minDate) {
      const dateStr = formatDate(date)
      const minDateStr = formatDate(minDateObj)
      return dateStr < minDateStr
    }
    return false
  }

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false
    return formatDate(date) === formatDate(selectedDate)
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return formatDate(date) === formatDate(today)
  }

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return
    onChange(formatDate(date))
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="relative" ref={datePickerRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        ref={buttonRef}
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-left flex items-center justify-between text-base"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-required={required}
      >
        <span className={value ? '' : 'text-gray-500 dark:text-gray-400'}>
          {value ? formatDisplayDate(value) : 'Select a date'}
        </span>
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full sm:w-[350px] mt-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl p-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {monthName}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Next month"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const disabled = isDateDisabled(date)
              const selected = isDateSelected(date)
              const today = isToday(date)

              return (
                <button
                  key={formatDate(date)}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={disabled}
                  className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                    disabled
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : selected
                      ? 'bg-primary-600 dark:bg-primary-500 text-white'
                      : today
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BookConsultationPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    organization: '',
    consultationTopic: '',
    detailedDescription: '',
    date: '',
    startTime: '',
    endTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const successMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login?redirect=/book-consultation')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    // Pre-fill name and email if user is logged in
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email
      }))
    }
  }, [user])

  useEffect(() => {
    // Fetch CSRF token on component mount
    const fetchCsrfToken = async () => {
      try {
        await authAPI.getCsrfToken()
      } catch (error) {
        console.error('Error fetching CSRF token:', error)
      }
    }
    fetchCsrfToken()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name
    setFormData(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }))
    // Clear field error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
    // Clear general error
    if (error) {
      setError('')
    }
  }

  const handleTimeChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear field error when user changes time
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    if (error) {
      setError('')
    }
  }

  const handleDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      date: value
    }))
    // Clear field error when user changes date
    if (fieldErrors['date']) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors['date']
        return newErrors
      })
    }
    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setFieldErrors({})
    setSuccessMessage('')

    try {
      // Client-side validation
      if (!formData.fullName || !formData.email || !formData.consultationTopic || 
          !formData.detailedDescription || !formData.date || !formData.startTime || !formData.endTime) {
        setError('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address')
        setIsSubmitting(false)
        return
      }

      // Validate time range
      if (formData.startTime >= formData.endTime) {
        setError('End time must be after start time')
        setIsSubmitting(false)
        return
      }

      // Map frontend form data to backend API format
      const consultationData = {
        consultation_date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phoneNumber || undefined,
        company_organization_name: formData.organization || undefined,
        consultation_topic: formData.consultationTopic,
        detailed_description: formData.detailedDescription
      }

      console.log('Submitting consultation request:', consultationData)

      const response = await portfolioAPI.submitConsultationRequest(consultationData)

      if (response.success) {
        setSuccessMessage(response.message || 'Consultation request submitted successfully. We will confirm your booking soon.')
        console.log('Consultation request submitted successfully:', response.data)
        
        // Clear form data
        setFormData({
          fullName: user?.name || '',
          email: user?.email || '',
          phoneNumber: '',
          organization: '',
          consultationTopic: '',
          detailedDescription: '',
          date: '',
          startTime: '',
          endTime: ''
        })

        // Scroll to success message after a short delay to ensure it's rendered
        setTimeout(() => {
          if (successMessageRef.current) {
            successMessageRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            })
          }
        }, 100)

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push('/?consultation=success')
        }, 3000)
      } else {
        // Handle validation errors
        if (response.errors) {
          const errors: Record<string, string> = {}
          Object.keys(response.errors).forEach(key => {
            const errorArray = response.errors![key]
            if (Array.isArray(errorArray) && errorArray.length > 0) {
              // Map backend field names to frontend field names
              let frontendFieldName = key
              if (key === 'consultation_date') frontendFieldName = 'date'
              else if (key === 'start_time') frontendFieldName = 'startTime'
              else if (key === 'end_time') frontendFieldName = 'endTime'
              else if (key === 'phone_number') frontendFieldName = 'phoneNumber'
              else if (key === 'company_organization_name') frontendFieldName = 'organization'
              else if (key === 'consultation_topic') frontendFieldName = 'consultationTopic'
              else if (key === 'detailed_description') frontendFieldName = 'detailedDescription'
              else if (key === 'full_name') frontendFieldName = 'fullName'
              
              errors[frontendFieldName] = errorArray[0]
            }
          })
          setFieldErrors(errors)
          
          // Set general error message
          if (response.message) {
            setError(response.message)
          } else {
            setError('Please check the form for errors.')
          }
        } else {
          setError(response.message || 'Failed to submit consultation request. Please try again.')
        }
      }
    } catch (error: any) {
      console.error('Error submitting consultation request:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = []
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      timeSlots.push(timeString)
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <SectionParticles particleCount={200} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-24">
        <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                Electrocom
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Book Free Consultation
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              Schedule your free consultation with our experts
            </p>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Time Selection Section */}
            <div className="space-y-8 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary-50/50 to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border-2 border-primary-200/50 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 shadow-sm">
                  <svg className="w-7 h-7 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Select Your Preferred Time
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Choose a date and time slot that works best for you
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <div className={fieldErrors['date'] ? 'border-2 border-red-500 dark:border-red-500 rounded-xl' : ''}>
                    <CustomDatePicker
                      id="date"
                      name="date"
                      value={formData.date}
                      minDate={today}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Available from today onwards
                  </p>
                  {fieldErrors['date'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['date']}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="startTime" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input type="hidden" name="startTime" value={formData.startTime} required />
                  <div className={fieldErrors['startTime'] ? 'border-2 border-red-500 dark:border-red-500 rounded-xl' : ''}>
                    <CustomDropdown
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      options={timeSlots}
                      placeholder="Choose start time"
                      onChange={(value) => handleTimeChange('startTime', value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Business hours: 9:00 AM - 6:00 PM
                  </p>
                  {fieldErrors['startTime'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['startTime']}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label htmlFor="endTime" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input type="hidden" name="endTime" value={formData.endTime} required />
                  <div className={fieldErrors['endTime'] ? 'border-2 border-red-500 dark:border-red-500 rounded-xl' : ''}>
                    <CustomDropdown
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      options={timeSlots}
                      placeholder="Choose end time"
                      onChange={(value) => handleTimeChange('endTime', value)}
                      filterFn={(time) => !formData.startTime || time > formData.startTime}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Must be after start time
                  </p>
                  {fieldErrors['endTime'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['endTime']}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className="space-y-8 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 shadow-sm">
                  <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Your Information
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Please provide your details for the consultation
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base ${
                      fieldErrors['fullName'] 
                        ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                    placeholder="John Doe"
                  />
                  {fieldErrors['fullName'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['fullName']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base ${
                      fieldErrors['email'] 
                        ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                    placeholder="john@example.com"
                  />
                  {fieldErrors['email'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['email']}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base ${
                      fieldErrors['phoneNumber'] 
                        ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                    placeholder="+91 9876543210"
                  />
                  {fieldErrors['phoneNumber'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['phoneNumber']}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 dark:text-white">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base ${
                      fieldErrors['organization'] 
                        ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                    placeholder="ABC Corporation"
                  />
                  {fieldErrors['organization'] && (
                    <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['organization']}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="consultationTopic" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Consultation Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="consultationTopic"
                  name="consultationTopic"
                  required
                  value={formData.consultationTopic}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-base ${
                    fieldErrors['consultationTopic'] 
                      ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                  }`}
                  placeholder="e.g., Software Development, Network Setup, etc."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Briefly describe what you'd like to discuss</p>
                {fieldErrors['consultationTopic'] && (
                  <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['consultationTopic']}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="detailedDescription" className="block text-sm font-semibold text-gray-900 dark:text-white">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="detailedDescription"
                  name="detailedDescription"
                  required
                  rows={6}
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none text-base ${
                    fieldErrors['detailedDescription'] 
                      ? 'border-red-500 dark:border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                  }`}
                  placeholder="Please provide details about what you'd like to discuss during the consultation..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Provide as much detail as possible to help us prepare for your consultation</p>
                {fieldErrors['detailedDescription'] && (
                  <p className="text-xs text-red-500 dark:text-red-400">{fieldErrors['detailedDescription']}</p>
                )}
              </div>
            </div>

            {/* Error Message - Above submit button */}
            {error && !successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 animate-slide-down">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm md:text-base text-red-600 dark:text-red-400">{error}</p>
                    {Object.keys(fieldErrors).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(fieldErrors).map(([key, value]) => (
                          <p key={key} className="text-xs text-red-500 dark:text-red-400">
                            • {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message - Above submit button */}
            {successMessage && (
              <div 
                ref={successMessageRef}
                className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 animate-slide-down"
              >
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm md:text-base text-green-600 dark:text-green-400 font-semibold flex-1">{successMessage}</p>
                </div>
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !!successMessage}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Booking Consultation...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Book Consultation</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm md:text-base font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

