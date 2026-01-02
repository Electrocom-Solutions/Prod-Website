'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import QuoteModal from '@/components/QuoteModal'

interface ServiceSubsection {
  icon: string
  title: string
  description: string
  services: string[]
}

const serviceSubsections: ServiceSubsection[] = [
  {
    icon: '🖥',
    title: 'Desktop Repair',
    description: 'We diagnose and repair desktop hardware issues efficiently to restore optimal performance and extend system life.',
    services: [
      'Motherboard & power supply repair',
      'RAM, HDD/SSD upgrades',
      'OS installation & troubleshooting',
      'Virus & malware removal',
      'Performance optimization'
    ]
  },
  {
    icon: '💻',
    title: 'Laptop Repair',
    description: 'Professional laptop repair services for all major brands with genuine parts and expert handling.',
    services: [
      'Screen & keyboard replacement',
      'Battery & charging issues',
      'Motherboard chip-level repair',
      'Heating & fan issues',
      'Software & OS support'
    ]
  },
  {
    icon: '🖨',
    title: 'Printer Repair',
    description: 'We repair and maintain inkjet, laser, and multifunction printers to ensure uninterrupted printing operations.',
    services: [
      'Cartridge & toner issues',
      'Paper jam & roller replacement',
      'Network printer configuration',
      'Print quality troubleshooting',
      'Annual maintenance contracts'
    ]
  },
  {
    icon: '📠',
    title: 'Scanner Repair',
    description: 'Fast and reliable scanner repair services to ensure accurate and efficient document digitization.',
    services: [
      'Scan quality issues',
      'Connectivity troubleshooting',
      'Sensor & motor repair',
      'Driver & software support',
      'Preventive maintenance'
    ]
  },
  {
    icon: '🔋',
    title: 'Online / Offline UPS Repair',
    description: 'Ensure continuous power backup with our expert UPS repair and maintenance services.',
    services: [
      'Battery replacement',
      'Inverter & PCB repair',
      'Load testing & calibration',
      'Preventive maintenance',
      'AMC services'
    ]
  }
]

export default function HardwareMaintenancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Hardware Maintenance
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Reliable and cost-effective hardware maintenance services to ensure your IT equipment runs smoothly with minimal downtime
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Hardware Maintenance
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We provide reliable and cost-effective hardware maintenance services to ensure your IT equipment runs smoothly with minimal downtime. Our experienced technicians handle everything from diagnostics and repairs to preventive maintenance for businesses and individuals.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Services Include:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Desktop & Laptop Repair</li>
                <li>Printer & Scanner Repair</li>
                <li>Online & Offline UPS Repair</li>
                <li>Preventive Maintenance</li>
                <li>On-site & Off-site Support</li>
              </ul>
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-500 dark:to-primary-300 text-white font-semibold hover:from-primary-700 hover:to-primary-500 dark:hover:from-primary-600 dark:hover:to-primary-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get a Quote
                </button>
                <Link
                  href="/#contact"
                  className="px-8 py-4 rounded-xl border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-white dark:hover:text-white transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Subsections */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceSubsections.map((service, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl border-2 border-white/30 dark:border-gray-700/40 backdrop-saturate-150 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Services Include:
                  </h4>
                  <ul className="space-y-2">
                    {service.services.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

