'use client'

import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import Icon from '@/components/Icon'
import type { IconName } from '@/components/Icon'

type ServiceDetailLayoutProps = {
  icon: IconName
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function ServiceDetailLayout({
  icon,
  title,
  subtitle,
  children,
}: ServiceDetailLayoutProps) {
  return (
    <div className="min-h-screen">
      <SectionParticles particleCount={200} />

      {/* Breadcrumb */}
      <section className="relative z-10 pt-6 pb-2 px-4 sm:px-6 lg:px-8">
        <nav className="max-w-5xl mx-auto" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/services"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-gray-700 dark:text-gray-200 truncate" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </section>

      {/* Hero */}
      <section className="relative min-h-[36vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-80 h-80 sm:w-96 sm:h-96 bg-primary-400/15 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-20 left-20 w-80 h-80 sm:w-96 sm:h-96 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/50 dark:to-gray-900/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="mb-4 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-primary-200/50 dark:border-primary-500/30 shadow-lg shadow-primary-500/10 dark:shadow-primary-500/5 text-primary-600 dark:text-primary-400 animate-fade-in"
            aria-hidden="true"
          >
            <Icon name={icon} className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              {title}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </section>
    </div>
  )
}
