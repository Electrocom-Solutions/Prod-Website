'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CRMDevelopmentPage() {
  return (
    <ServiceDetailLayout
      icon="users"
      title="CRM Development"
      subtitle="Customer Relationship Management systems to streamline your sales and support processes"
    >
      <ServiceDetailContent
        aboutTitle="About CRM Development"
        aboutText="We develop custom CRM systems that help you manage customer relationships, track sales, and improve customer satisfaction."
        servicesTitle="Our services include"
        services={[
          'Custom CRM Development',
          'Lead Management',
          'Sales Pipeline Tracking',
          'Customer Contact Management',
          'Email Integration',
          'Reporting & Analytics',
          'Mobile CRM Access',
          'Integration with Existing Tools',
        ]}
      />
    </ServiceDetailLayout>
  )
}
