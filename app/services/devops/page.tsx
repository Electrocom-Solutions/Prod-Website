'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function DevOpsPage() {
  return (
    <ServiceDetailLayout
      icon="cog-6-tooth"
      title="DevOps"
      subtitle="CI/CD pipelines, automation, and infrastructure management for seamless deployments"
    >
      <ServiceDetailContent
        aboutTitle="About DevOps"
        aboutText="We streamline your development and deployment processes with modern DevOps practices, automation, and infrastructure as code."
        servicesTitle="Our services include"
        services={[
          'CI/CD Pipeline Setup',
          'Infrastructure as Code (IaC)',
          'Container Orchestration (Docker, Kubernetes)',
          'Automated Testing & Deployment',
          'Monitoring & Logging Solutions',
          'Configuration Management',
          'Performance Optimization',
          'DevOps Training & Consulting',
        ]}
      />
    </ServiceDetailLayout>
  )
}
