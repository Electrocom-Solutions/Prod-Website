'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CustomAISolutionsPage() {
  return (
    <ServiceDetailLayout
      icon="cpu-chip"
      title="Custom AI Solutions"
      subtitle="Leverage artificial intelligence to automate processes and gain competitive advantages"
    >
      <ServiceDetailContent
        aboutTitle="About Custom AI Solutions"
        aboutText="We develop custom AI solutions and integrate ready-to-use AI services to help you automate processes, enhance decision-making, and create intelligent applications."
        servicesTitle="Our services include"
        services={[
          'Custom AI Development - Tailored AI models and algorithms for your specific needs',
          'Ready-to-use AI Solutions - Integration of pre-built AI services and platforms',
          'Machine Learning Models',
          'Natural Language Processing',
          'Computer Vision Solutions',
          'Chatbot Development',
          'AI-powered Automation',
          'AI Consulting & Strategy',
        ]}
      />
    </ServiceDetailLayout>
  )
}
