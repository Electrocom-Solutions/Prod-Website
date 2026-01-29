'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import Icon, { type IconName } from './Icon'

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

  const expertise: {
    title: string
    description: string
    services: string[]
    icon: IconName
    gradient: string
  }[] = [
    {
      title: "Custom Software Development",
      description: "We design and deploy software tailored to your business needs.",
      services: [
        "Custom application development",
        "Enterprise-grade ERP systems",
        "Web applications and APIs",
        "Software integration and modernization"
      ],
      icon: "cpu-chip",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Web & Mobile Development",
      description: "Modern web and mobile applications built for scale and usability.",
      services: [
        "Responsive web applications",
        "Native and cross-platform mobile apps",
        "Progressive web apps (PWA)",
        "UI/UX design and optimization"
      ],
      icon: "device-phone-mobile",
      gradient: "from-indigo-500 to-primary-500"
    },
    {
      title: "Cloud & DevOps",
      description: "Cloud architecture, migration, and DevOps to help you scale with confidence.",
      services: [
        "Cloud migration (AWS, Azure, GCP)",
        "Infrastructure as Code",
        "CI/CD pipelines and automation",
        "Monitoring and reliability"
      ],
      icon: "cloud",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "AI & IT Consulting",
      description: "Strategic technology consulting and AI solutions to drive your digital transformation.",
      services: [
        "Technology assessment and strategy",
        "AI and machine learning solutions",
        "Digital transformation guidance",
        "Technical due diligence"
      ],
      icon: "magnifying-glass",
      gradient: "from-orange-500 to-primary-500"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="expertise" 
      className="py-10 relative overflow-hidden"
    >
      <SectionParticles particleCount={180} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Our Expertise
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 ${isVisible ? 'animate-fade-in' : ''}`}>
          {expertise.map((item, index) => (
            <div 
              key={index} 
              className="group relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-2xl dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900 transition-all duration-300 border border-white/20 dark:border-gray-700/30 backdrop-saturate-150 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative flex items-start space-x-3 mb-3">
                <div className="text-primary-700 dark:text-primary-300 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon} className="w-10 h-10" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                  <ul className="space-y-1.5">
                    {item.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start group/item">
                        <span className="text-primary-600 dark:text-primary-400 mr-2 font-bold group-hover/item:scale-125 transition-transform duration-300">•</span>
                        <span className="text-base text-gray-600 dark:text-gray-400">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
