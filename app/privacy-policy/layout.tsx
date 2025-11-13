import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Electrocom',
  description: 'Privacy Policy for Electrocom - Learn how we collect, use, and protect your personal information across our website, ERP console, and mobile application.',
  keywords: 'privacy policy, data protection, Electrocom, privacy',
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

