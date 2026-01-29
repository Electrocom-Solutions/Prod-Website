'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import { contactUsAPI, ContactUsData } from '@/lib/api'

type ContactUsProps = {
  badge?: string
  title?: string
  subtitle?: string
}

export default function ContactUs({ badge = 'Get In Touch', title = 'Contact Us', subtitle = "Have a project or tender requirement? We're ready to help." }: ContactUsProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const contactData: ContactUsData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        ...(formData.phone.trim() && { phone: formData.phone.trim() })
      }

      const response = await contactUsAPI.submit(contactData)

      if (response.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
        
        // Handle field-specific errors
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
            setErrorMessage(response.message)
          } else if (errors.general) {
            setErrorMessage(errors.general)
          } else {
            setErrorMessage('Please check the form for errors and try again.')
          }
        } else {
          setErrorMessage(response.message || 'Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
    setIsSubmitting(false)
    }
  }

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
    
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
      setErrorMessage('')
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={150} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            {title}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className={`max-w-6xl mx-auto ${isVisible ? 'animate-fade-in' : ''}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-5">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="backdrop-blur-xl bg-primary-100/80 dark:bg-primary-900/40 p-3 rounded-xl group-hover:bg-primary-200/80 dark:group-hover:bg-primary-900/60 transition-colors duration-300 transform group-hover:scale-110 border border-primary-200/50 dark:border-primary-800/50">
                      <svg className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                      <a 
                        href="mailto:admin@electrocomsolutions.in" 
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                      >
                        admin@electrocomsolutions.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="backdrop-blur-xl bg-primary-100/80 dark:bg-primary-900/40 p-3 rounded-xl group-hover:bg-primary-200/80 dark:group-hover:bg-primary-900/60 transition-colors duration-300 transform group-hover:scale-110 border border-primary-200/50 dark:border-primary-800/50">
                      <svg className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Phone</h4>
                      <a 
                        href="tel:+919414110473" 
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                      >
                        +91 9414110473
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="backdrop-blur-xl bg-primary-100/80 dark:bg-primary-900/40 p-3 rounded-xl group-hover:bg-primary-200/80 dark:group-hover:bg-primary-900/60 transition-colors duration-300 transform group-hover:scale-110 border border-primary-200/50 dark:border-primary-800/50">
                      <svg className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Address</h4>
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        12 Pratap Nagar Market, Chittorgarh, Rajasthan<br />
                        Country: India<br />
                        Postal Code: 382421
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="group bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="group bg-blue-800 text-white p-4 rounded-xl hover:bg-blue-900 dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="group bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-5">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      fieldErrors.name 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none`}
                    placeholder="Your Name"
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      fieldErrors.phone 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none`}
                    placeholder="+91 1234567890 (Optional)"
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      fieldErrors.message 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700'
                    } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none`}
                    placeholder="Tell us about your requirements..."
                  />
                  {fieldErrors.message && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{fieldErrors.message}</p>
                  )}
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-800">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      ✓ Thank you for contacting us! We will get back to you soon.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800">
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      {errorMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
