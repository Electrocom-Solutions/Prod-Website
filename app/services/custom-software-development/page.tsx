'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CustomSoftwareDevelopmentPage() {
  return (
    <ServiceDetailLayout
      icon="cpu-chip"
      title="Custom Software Development"
      subtitle="Bespoke software solutions designed to solve your unique business challenges"
    >
      <ServiceDetailContent
        aboutTitle="About Custom Software Development"
        aboutText="We create tailor-made software solutions that perfectly fit your business requirements, from concept to deployment and beyond."
        servicesTitle="Our services include"
        services={[
          'Requirements Analysis & Planning',
          'Custom Application Development',
          'Database Design & Development',
          'API Development',
          'System Integration',
          'Quality Assurance & Testing',
          'Deployment & Migration',
          'Ongoing Maintenance & Support',
        ]}
      />
    </ServiceDetailLayout>
  )
}
