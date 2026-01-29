'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { portfolioAPI, authAPI } from '@/lib/api'

interface DropdownOption {
  value: string
  label: string
}

interface CustomDropdownProps {
  id: string
  name: string
  value: string
  options: DropdownOption[]
  placeholder: string
  onChange: (value: string) => void
  required?: boolean
}

function CustomDropdown({ id, name, value, options, placeholder, onChange, required }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

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

  const getSelectedLabel = () => options.find(opt => opt.value === value)?.label ?? ''
  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && highlightedIndex >= 0) handleSelect(options[highlightedIndex].value)
      else setIsOpen(!isOpen)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
      buttonRef.current?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) setIsOpen(true)
      else {
        setHighlightedIndex(prev => {
          const newIndex = prev < options.length - 1 ? prev + 1 : prev
          setTimeout(() => itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0)
          return newIndex
        })
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (isOpen) {
        setHighlightedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : -1
          if (newIndex >= 0) setTimeout(() => itemRefs.current[newIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 0)
          return newIndex
        })
      }
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        ref={buttonRef}
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-left flex items-center justify-between"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={required}
      >
        <span className={value ? '' : 'text-gray-500 dark:text-gray-400'}>{value ? getSelectedLabel() : placeholder}</span>
        <svg className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl max-h-60 overflow-auto">
          <ul ref={listRef} role="listbox" className="py-2" aria-label={placeholder}>
            {options.length === 0 ? (
              <li className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">No options available</li>
            ) : (
              options.map((option, index) => (
                <li
                  key={option.value}
                  ref={el => { itemRefs.current[index] = el }}
                  role="option"
                  aria-selected={value === option.value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    value === option.value
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : highlightedIndex === index
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {value === option.value && (
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

const serviceValueMap: Record<string, string> = {
  'software-solutions': 'Software Solutions',
  'custom-development': 'Custom Development',
  'web-development': 'Web Development',
  'mobile-apps': 'Mobile Apps',
  'cloud-solutions': 'Cloud Solutions',
  'consulting': 'Consulting',
  'other': 'Other',
}

const serviceOptions: DropdownOption[] = [
  { value: 'software-solutions', label: 'Software Solutions' },
  { value: 'custom-development', label: 'Custom Development' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-apps', label: 'Mobile Apps' },
  { value: 'cloud-solutions', label: 'Cloud Solutions' },
  { value: 'consulting', label: 'IT Consulting' },
  { value: 'other', label: 'Other' },
]

export default function QuoteForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    companyName: '',
    serviceRequired: '',
    projectDescription: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    authAPI.getCsrfToken().catch(err => console.error('CSRF fetch error:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setFieldErrors({})
    try {
      const serviceRequired = serviceValueMap[formData.serviceRequired] || formData.serviceRequired
      const quoteData = {
        full_name: formData.fullName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        company_name: formData.companyName,
        service_required: serviceRequired,
        project_description: formData.projectDescription,
      }
      const response = await portfolioAPI.submitQuoteRequest(quoteData)
      if (response.success) {
        setFormData({ fullName: '', email: '', mobileNumber: '', companyName: '', serviceRequired: '', projectDescription: '' })
        router.push('/?quote=success')
      } else {
        if (response.errors) {
          const errors: Record<string, string> = {}
          Object.keys(response.errors).forEach(key => {
            const arr = response.errors![key]
            if (Array.isArray(arr) && arr.length > 0) errors[key] = arr[0]
          })
          setFieldErrors(errors)
          if (response.message) setError(response.message)
          else setError('Please check the form for errors.')
        } else {
          setError(response.message || 'Failed to submit quote request. Please try again.')
        }
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors(prev => { const next = { ...prev }; delete next[name]; return next })
    if (error) setError('')
  }

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, serviceRequired: value }))
    if (fieldErrors['service_required']) setFieldErrors(prev => { const next = { ...prev }; delete next['service_required']; return next })
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500/20 transition-all outline-none ${
      fieldErrors[field] ? 'border-red-500 dark:border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 animate-slide-down">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-sm md:text-base text-red-600 dark:text-red-400">{error}</p>
          </div>
          {Object.keys(fieldErrors).length > 0 && (
            <div className="mt-2 space-y-1">
              {Object.entries(fieldErrors).map(([key, value]) => (
                <p key={key} className="text-xs text-red-500 dark:text-red-400">• {key.replace(/_/g, ' ')}: {value}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Name <span className="text-red-500">*</span></label>
          <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClass('full_name')} placeholder="John Doe" />
          {fieldErrors['full_name'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['full_name']}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email <span className="text-red-500">*</span></label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="john@example.com" />
          {fieldErrors['email'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['email']}</p>}
        </div>
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Mobile Number <span className="text-red-500">*</span></label>
          <input type="tel" id="mobileNumber" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className={inputClass('mobile_number')} placeholder="+91 1234567890" />
          {fieldErrors['mobile_number'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['mobile_number']}</p>}
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Company Name <span className="text-red-500">*</span></label>
          <input type="text" id="companyName" name="companyName" required value={formData.companyName} onChange={handleChange} className={inputClass('company_name')} placeholder="Your Company" />
          {fieldErrors['company_name'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['company_name']}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="serviceRequired" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Service Required <span className="text-red-500">*</span></label>
        <div className={fieldErrors['service_required'] ? 'border-2 border-red-500 dark:border-red-500 rounded-xl' : ''}>
          <CustomDropdown id="serviceRequired" name="serviceRequired" value={formData.serviceRequired} options={serviceOptions} placeholder="Select a service" onChange={handleServiceChange} required />
        </div>
        {fieldErrors['service_required'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['service_required']}</p>}
      </div>

      <div>
        <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Project Description <span className="text-red-500">*</span></label>
        <textarea id="projectDescription" name="projectDescription" required rows={4} value={formData.projectDescription} onChange={handleChange} className={`${inputClass('project_description')} resize-none`} placeholder="Tell us about your project requirements..." />
        {fieldErrors['project_description'] && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors['project_description']}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-gray-200/60 dark:border-gray-700/60">
        <Link href="/" className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-semibold text-center disabled:opacity-50 disabled:cursor-not-allowed">
          Cancel
        </Link>
        <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Request</span>
          )}
        </button>
      </div>
    </form>
  )
}
