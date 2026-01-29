'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CloudArchitecturePage() {
  return (
    <ServiceDetailLayout
      icon="cloud"
      title="Cloud Architecture"
      subtitle="Scalable and secure cloud infrastructure solutions across leading cloud platforms"
    >
      <ServiceDetailContent
        aboutTitle="About Cloud Architecture"
        aboutText="We design and implement robust cloud architectures that scale with your business, ensuring high availability, security, and cost optimization across AWS, Azure, and Google Cloud platforms."
        servicesTitle="Our services include"
        services={[
          'AWS Solutions - Architecture design, migration, and optimization',
          'Azure Solutions - Enterprise cloud infrastructure and services',
          'Google Cloud - Scalable cloud solutions and data analytics',
          'Multi-Cloud Strategy',
          'Cloud Migration Services',
          'Cloud Security & Compliance',
          'Cost Optimization',
          '24/7 Cloud Monitoring & Support',
        ]}
      />
    </ServiceDetailLayout>
  )
}
