'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Redirect /services/software-solutions to /services.
 * All IT service cards now live on /services (Our IT Services).
 */
export default function SoftwareSolutionsRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/services')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary-600 dark:border-primary-400 border-t-transparent" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to services...</p>
      </div>
    </div>
  )
}
