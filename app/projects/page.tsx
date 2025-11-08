'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SectionParticles from '@/components/SectionParticles'
import { portfolioAPI } from '@/lib/api'

interface Project {
  id: number
  name: string
  description: string
  category: string
  project_url?: string | null
  cover_image_url?: string | null
}

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await portfolioAPI.getProjects()
        
        if (response.success && response.projects.length > 0) {
          // Map backend projects to frontend format
          const mappedProjects: Project[] = response.projects.map((project) => ({
            id: project.id,
            name: project.title,
            description: project.description,
            category: project.project_tag || 'Project', // Use project_tag as category
            project_url: project.project_url,
            cover_image_url: project.cover_image_url
          }))
          
          setProjects(mappedProjects)
        } else {
          // No projects available - set empty array
          setProjects([])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Set empty array on error
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      <SectionParticles particleCount={200} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Our Projects
          </h1>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of successfully delivered projects that showcase our versatility, innovation, and commitment to excellence.
          </p>
        </div>

        {isLoading ? (
          // Loading state - show skeleton
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8`}>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 animate-pulse"
              >
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
                <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                <div className="h-20 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible ? 'animate-fade-in' : ''}`}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  {project.project_url && (
                    <div className="mt-4">
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No projects available at the moment</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Check back soon for our latest projects!</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/#contact"
            className="inline-block bg-primary-600 dark:bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </div>
  )
}

