'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function UIUXDesignPage() {
  return (
    <ServiceDetailLayout
      icon="document-text"
      title="UI/UX Design"
      subtitle="User-centered design solutions that enhance user experience and engagement"
    >
      <ServiceDetailContent
        aboutTitle="About UI/UX Design"
        aboutText="We create intuitive, beautiful, and user-friendly interfaces that not only look great but also provide exceptional user experiences."
        servicesTitle="Our services include"
        services={[
          'User Research & Analysis',
          'Wireframing & Prototyping',
          'UI Design & Visual Identity',
          'UX Design & User Flows',
          'Responsive Design',
          'Design Systems & Style Guides',
          'Usability Testing',
          'Design-to-Development Handoff',
        ]}
      />
    </ServiceDetailLayout>
  )
}
