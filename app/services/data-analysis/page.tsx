'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function DataAnalysisPage() {
  return (
    <ServiceDetailLayout
      icon="chart-bar"
      title="Data Analysis"
      subtitle="Transform your data into actionable insights with advanced analytics and visualization"
    >
      <ServiceDetailContent
        aboutTitle="About Data Analysis"
        aboutText="We help you unlock the power of your data with comprehensive analytics solutions, custom dashboards, and predictive modeling to drive informed business decisions."
        servicesTitle="Our services include"
        services={[
          'Business Intelligence - Comprehensive data analysis and reporting',
          'Custom Dashboards - Real-time data visualization and monitoring',
          'Predictive Analytics - Machine learning models for forecasting',
          'Data Warehousing',
          'ETL Processes',
          'Data Mining & Pattern Recognition',
          'Statistical Analysis',
          'Report Automation',
        ]}
      />
    </ServiceDetailLayout>
  )
}
