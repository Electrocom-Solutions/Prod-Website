'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function MobileAppDevelopmentPage() {
  return (
    <ServiceDetailLayout
      icon="device-phone-mobile"
      title="Mobile App Development"
      subtitle="Native and cross-platform mobile applications for iOS and Android devices"
    >
      <ServiceDetailContent
        aboutTitle="About Mobile App Development"
        aboutText="We develop high-performance mobile applications for iOS and Android platforms, delivering seamless user experiences and robust functionality."
        servicesTitle="Our services include"
        services={[
          'Native iOS Development (Swift, Objective-C)',
          'Native Android Development (Kotlin, Java)',
          'Cross-Platform Development (React Native, Flutter)',
          'App UI/UX Design',
          'App Testing & QA',
          'App Store Optimization',
          'App Maintenance & Updates',
        ]}
      />
    </ServiceDetailLayout>
  )
}
