'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CloudHostingPage() {
  return (
    <ServiceDetailLayout
      icon="cloud"
      title="Cloud Hosting"
      subtitle="Scalable cloud infrastructure and hosting solutions for your applications"
    >
      <ServiceDetailContent
        aboutTitle="About Cloud Hosting"
        aboutText="We provide reliable, scalable cloud hosting solutions that ensure your applications are always available and perform at their best."
        servicesTitle="Our services include"
        services={[
          'Cloud Infrastructure Setup',
          'Server Configuration & Management',
          'Load Balancing & Auto-Scaling',
          'Database Hosting',
          'CDN Integration',
          'Backup & Disaster Recovery',
          'Security & Monitoring',
          '24/7 Support & Maintenance',
        ]}
      />
    </ServiceDetailLayout>
  )
}
