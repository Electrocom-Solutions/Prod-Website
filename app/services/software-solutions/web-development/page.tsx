'use client'

import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import Icon from '@/components/Icon'

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen">
      <SectionParticles particleCount={200} />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 flex items-center justify-center text-primary-700 dark:text-primary-300">
            <Icon name="globe-alt" className="w-16 h-16" aria-hidden="true" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Web Development
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Custom web applications built with modern technologies for optimal performance and user experience
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Web Development
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We create powerful, scalable, and user-friendly web applications that drive your business forward. 
                Our team specializes in modern web technologies and frameworks to deliver exceptional digital experiences.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Services Include:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Responsive Web Design</li>
                <li>Frontend Development (React, Next.js, Vue.js)</li>
                <li>Backend Development (Node.js, Python, PHP)</li>
                <li>Full-Stack Solutions</li>
                <li>API Development & Integration</li>
                <li>Performance Optimization</li>
                <li>SEO Optimization</li>
                <li>Maintenance & Support</li>
              </ul>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/get-quote"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white dark:hover:text-white transition-all"
                >
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

