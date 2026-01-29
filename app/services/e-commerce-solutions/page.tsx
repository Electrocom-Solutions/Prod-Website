'use client'

import ServiceDetailLayout from '@/components/ServiceDetailLayout'
import ServiceDetailContent from '@/components/ServiceDetailContent'

export default function ECommerceSolutionsPage() {
  return (
    <ServiceDetailLayout
      icon="shopping-cart"
      title="E-Commerce Solutions"
      subtitle="Complete e-commerce platforms with payment integration and inventory management"
    >
      <ServiceDetailContent
        aboutTitle="About E-Commerce Solutions"
        aboutText="We build powerful e-commerce platforms that help you sell online with ease, featuring secure payment processing, inventory management, and seamless user experiences."
        servicesTitle="Our services include"
        services={[
          'Shopify Store Development - Custom Shopify themes and app development',
          'Custom Store Development - Bespoke e-commerce platforms built from scratch',
          'Payment Gateway Integration - Secure payment processing with multiple gateways',
          'Inventory Management Systems',
          'Order Management & Fulfillment',
          'Product Catalog Management',
          'Customer Account Management',
          'Analytics & Reporting',
          'Multi-channel Integration',
        ]}
      />
    </ServiceDetailLayout>
  )
}
