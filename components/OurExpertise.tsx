'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'

export default function OurExpertise() {
  const [isVisible, setIsVisible] = useState(false)
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

  const expertise = [
    {
      title: "Hardware Maintenance",
      description: "We ensure your hardware stays reliable and efficient.",
      services: [
        "Computer and printer repair",
        "CCTV camera setup and maintenance",
        "Annual Maintenance Contracts (AMC)"
      ],
      icon: "🔧",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Software Solutions",
      description: "We design and deploy software tailored to your needs.",
      services: [
        "Software installation and configuration",
        "Customized software development",
        "Enterprise-grade ERP systems",
        "Web application and API development"
      ],
      icon: "💻",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Network Solutions",
      description: "Building strong and secure networks for smooth operations.",
      services: [
        "LAN/WAN setup and configuration",
        "Networking infrastructure design and management",
        "Troubleshooting and optimization"
      ],
      icon: "🌐",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Manpower Supply",
      description: "We provide reliable and skilled manpower across industries — both private and government.",
      services: [
        "Unskilled – Cleaning, maintenance, support staff",
        "Semi-skilled / Skilled – Computer operators, technicians, machine operators",
        "Highly Skilled – Engineers, doctors, and specialized professionals"
      ],
      icon: "👥",
      gradient: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="expertise" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={180} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            What We Do
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Our Expertise
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-8 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative flex items-start space-x-4 mb-4">
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start group/item">
                        <span className="text-primary-600 dark:text-primary-400 mr-2 font-bold group-hover/item:scale-125 transition-transform duration-300">•</span>
                        <span className="text-base md:text-lg text-gray-600 dark:text-gray-400">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 backdrop-blur-xl bg-primary-50/80 dark:bg-primary-900/30 p-8 rounded-xl border border-primary-100/50 dark:border-primary-800/50 backdrop-saturate-150 ${isVisible ? 'animate-scale-in' : ''}`} style={{ animationDelay: '0.4s' }}>
          <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Manpower Examples</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hospitals:</h5>
              <ul className="space-y-1 text-base md:text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  Doctors (contract-based)
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  GNM/Nursing staff, Radiographers, Computer Operators
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  Safai & Maintenance Workers
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Government Departments:</h5>
              <ul className="space-y-1 text-base md:text-lg text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">•</span>
                  Skilled and unskilled manpower for support and operational roles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
