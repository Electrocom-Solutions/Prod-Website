'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function SoftwareDevelopmentPage() {
  return (
    <ServiceDetailLayout
      icon="cpu-chip"
      title="Software Development"
      subtitle="Custom software solutions and system integrations tailored to your business needs"
    >
      <ServiceDetailContent
        aboutTitle="About Software Development"
        aboutText="We develop custom software applications and APIs that integrate seamlessly with your existing systems, delivering solutions that drive efficiency and growth."
        servicesTitle="Our services include"
        services={[
          'Custom Applications - Tailored software solutions for your unique requirements',
          'API Development - RESTful and GraphQL APIs for system integration',
          'System Integration - Connect disparate systems and applications',
          'Microservices Architecture',
          'Legacy System Modernization',
          'Database Design & Development',
          'Performance Optimization',
          'Maintenance & Support',
        ]}
      />
    </ServiceDetailLayout>
  )
}
