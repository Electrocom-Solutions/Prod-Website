'use client'

import QuoteForm from '@/components/QuoteForm'
import SectionParticles from '@/components/SectionParticles'

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SectionParticles particleCount={160} />

      {/* Hero — professional IT-style header */}
      <section className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-slate-900/95 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
            Electrocom — Your IT Partner
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Get a Quote
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Share your project details and we&apos;ll get back with a tailored quote. Prefer to talk? Use the contact details on this page.
          </p>
        </div>
      </section>

      {/* Main content: Form + Contact Information */}
      <section className="relative z-10 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Information — left on desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-600/10 to-primary-400/10 dark:from-primary-500/10 dark:to-primary-300/10 border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-5">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Contact Information</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Reach us directly for faster response.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100/80 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Email</p>
                        <a
                          href="mailto:admin@electrocomsolutions.in"
                          className="text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors break-all"
                        >
                          admin@electrocomsolutions.in
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100/80 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                        <a
                          href="tel:+919414110473"
                          className="text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                        >
                          +91 9414110473
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100/80 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 border border-primary-200/50 dark:border-primary-800/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">Address</p>
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          12 Pratap Nagar Market, Chittorgarh, Rajasthan
                          <br />
                          Country: India
                          <br />
                          Postal Code: 382421
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-gray-200/60 dark:border-gray-700/60 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 flex-shrink-0 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Typically we respond within 24–48 hours.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote form — right on desktop */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/40 overflow-hidden">
                <div className="border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-5">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Tell Us About Your Project</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fill in the form below. All fields marked with * are required.</p>
                </div>
                <div className="p-6 lg:p-8">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
