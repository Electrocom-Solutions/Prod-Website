'use client'

import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import Icon, { type IconName } from '@/components/Icon'

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: IconName
  pointers: string[]
}

const services: ServiceCard[] = [
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    description: 'Scalable and secure cloud infrastructure solutions across leading cloud platforms.',
    icon: 'cloud',
    pointers: ['AWS Solutions', 'Azure Solutions', 'Google Cloud']
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Custom software solutions and system integrations tailored to your business needs.',
    icon: 'cpu-chip',
    pointers: ['Custom Applications', 'API Development', 'System Integration']
  },
  {
    id: 'devops',
    title: 'DevOps',
    description: 'Streamlined development and deployment pipelines for faster, more reliable releases.',
    icon: 'cog-6-tooth',
    pointers: ['CI/CD Pipelines', 'Cloud Infrastructure', 'Container Orchestration']
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern, responsive web applications that deliver exceptional user experiences.',
    icon: 'globe-alt',
    pointers: ['Responsive Web Design', 'E-Commerce Solutions', 'Progressive Web Apps']
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    icon: 'device-phone-mobile',
    pointers: ['iOS Development', 'Android Development', 'Cross Platform Development']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that enhance user experience and engagement.',
    icon: 'document-text',
    pointers: ['User Research', 'Wireframing & Prototyping', 'Visual Design']
  },
  {
    id: 'custom-erp-solution',
    title: 'Custom ERP Solutions',
    description: 'Enterprise Resource Planning systems tailored to your business processes.',
    icon: 'server',
    pointers: ['Process Automation', 'Resource Planning', 'Integration Services']
  },
  {
    id: 'crm-development',
    title: 'CRM Development',
    description: 'Customer Relationship Management systems to streamline your sales and support processes.',
    icon: 'users',
    pointers: ['Lead Management', 'Sales Automation', 'Customer Support']
  },
  {
    id: 'e-commerce-solutions',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration and inventory management.',
    icon: 'shopping-cart',
    pointers: ['Shopify Store Development', 'Custom Store Development', 'Payment Gateway Integration']
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Transform your data into actionable insights with advanced analytics and visualization.',
    icon: 'chart-bar',
    pointers: ['Business Intelligence', 'Custom Dashboards', 'Predictive Analytics']
  },
  {
    id: 'custom-ai-solutions',
    title: 'Custom AI Solutions',
    description: 'Leverage artificial intelligence to automate processes and gain competitive advantages.',
    icon: 'cpu-chip',
    pointers: ['Custom AI Development', 'Ready-to-use AI Solutions']
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <SectionParticles particleCount={200} />

      {/* Hero Section - Our IT Services */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-slate-900/98 to-[#0f172a]" />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/5 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-6">
            Electrocom — Your IT Partner
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Our IT Services
          </h1>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            End-to-end technology solutions — custom software, web & mobile apps, cloud, DevOps, and IT consulting. One place, no redirects.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#our-it-services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white transition-all"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-14 flex justify-center">
            <a
              href="#our-it-services"
              className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Scroll to services"
            >
              <span className="text-xs font-medium uppercase tracking-wider">View all</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* All IT Services Grid - no redirect */}
      <section id="our-it-services" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              Our IT Services
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From development to deployment — everything you need from your IT partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-6 md:p-8 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 text-primary-700 dark:text-primary-300">
                  <Icon name={service.icon} className="w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {service.pointers.map((pointer, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{pointer}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
