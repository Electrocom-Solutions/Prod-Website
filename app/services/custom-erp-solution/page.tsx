'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function CustomERPSolutionPage() {
  return (
    <ServiceDetailLayout
      icon="server"
      title="Custom ERP Solution"
      subtitle="Enterprise Resource Planning systems tailored to your business needs"
    >
      <ServiceDetailContent
        aboutTitle="About Custom ERP Solution"
        aboutText="We develop custom ERP systems that integrate all your business processes into a single, unified platform, improving efficiency and decision-making."
        servicesTitle="Our services include"
        services={[
          'Custom ERP Development',
          'Financial Management Modules',
          'Human Resources Management',
          'Supply Chain Management',
          'Inventory Management',
          'Reporting & Analytics',
          'Integration with Existing Systems',
          'Training & Support',
        ]}
      />
    </ServiceDetailLayout>
  )
}
