import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GlobalParticles from '@/components/GlobalParticles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Electrocom - IT & Software Solutions',
  description: 'Your Trusted Partner for IT & Software Solutions. Custom software development, web and mobile apps, cloud solutions, and IT consulting.',
  // Favicon and apple-touch-icon are set via app/icon.png and app/apple-icon.png (logo only.png)
  manifest: '/favicon/site.webmanifest',
  themeColor: '#0f172a',
  appleWebApp: { capable: true, title: 'Electrocom', statusBarStyle: 'black-translucent' },
  other: {
    'msapplication-TileColor': '#0f172a',
    'msapplication-TileImage': '/favicon/ms-icon-144x144.png',
    'msapplication-config': '/favicon/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          <AuthProvider>
            <GlobalParticles />
            <Header />
            <main className="relative z-10 min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

