'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function WebDevelopmentPage() {
  return (
    <ServiceDetailLayout
      icon="globe-alt"
      title="Web Development"
      subtitle="Custom web applications built with modern technologies for optimal performance and user experience"
    >
      <ServiceDetailContent
        aboutTitle="About Web Development"
        aboutText="We create powerful, scalable, and user-friendly web applications that drive your business forward. Our team specializes in modern web technologies and frameworks to deliver exceptional digital experiences."
        servicesTitle="Our services include"
        services={[
          'Responsive Web Design',
          'Frontend Development (React, Next.js, Vue.js)',
          'Backend Development (Node.js, Python, PHP)',
          'Full-Stack Solutions',
          'API Development & Integration',
          'Performance Optimization',
          'SEO Optimization',
          'Maintenance & Support',
        ]}
      />
    </ServiceDetailLayout>
  )
}
