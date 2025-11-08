'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from './SectionParticles'
import dynamic from 'next/dynamic'
import { portfolioAPI, ProjectData } from '@/lib/api'
import { generateProjectIcon } from '@/lib/projectIcons'

const InfiniteMenu = dynamic(() => import('./InfiniteMenu'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white text-xl animate-pulse">Loading interactive menu...</div>
    </div>
  )
})

interface MenuItem {
  image: string
  link: string
  title: string
  description: string
}

// Fallback projects if API fails or returns no data
const fallbackProjects: MenuItem[] = [
  {
    image: generateProjectIcon('wedesignz', 0),
    link: '#',
    title: 'Wedesignz',
    description: 'Creative design and branding platform'
  },
  {
    image: generateProjectIcon('electrocom-erp', 1),
    link: '#',
    title: 'Electrocom ERP',
    description: 'Internal ERP system for managing operations and manpower'
  },
  {
    image: generateProjectIcon('shree-bada-paliwal', 2),
    link: '#',
    title: 'Shree Bada Paliwal Samaj Website',
    description: 'Community management portal with event & member modules'
  },
  {
    image: generateProjectIcon('vimson-derma', 3),
    link: '#',
    title: 'Vimson Derma Website',
    description: 'Professional website for a dermatology clinic'
  },
  {
    image: generateProjectIcon('solvifyhub', 4),
    link: '#',
    title: 'SolvifyHub',
    description: 'SaaS platform offering technical solutions to small businesses'
  },
  {
    image: generateProjectIcon('clickfix', 5),
    link: '#',
    title: 'ClickFix',
    description: 'On-demand service management platform'
  },
  {
    image: generateProjectIcon('learnhill', 6),
    link: '#',
    title: 'LearnHill',
    description: 'Online learning and course management system'
  },
  {
    image: generateProjectIcon('tile-placement', 7),
    link: '#',
    title: 'Tile Placement Software',
    description: 'Intelligent bin-packing algorithm for optimizing tile placement on slabs'
  },
  {
    image: generateProjectIcon('board-result', 8),
    link: '#',
    title: 'Board Result Printing Software',
    description: 'Automated board exam result printing system'
  },
  {
    image: generateProjectIcon('madhuchaitanya', 9),
    link: '#',
    title: 'Madhuchaitanya (API)',
    description: 'API solution for educational institute automation'
  }
]

export default function PastProjects() {
  const [isVisible, setIsVisible] = useState(false)
  const [projects, setProjects] = useState<MenuItem[]>(fallbackProjects)
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('PastProjects: Fetching projects from API...')
        const response = await portfolioAPI.getProjects()
        console.log('PastProjects: API response:', response)
        
        if (response && response.success && response.projects && Array.isArray(response.projects) && response.projects.length > 0) {
          console.log('PastProjects: Processing', response.projects.length, 'projects')
          
          // Map backend ProjectData to MenuItem format
          const mappedProjects: MenuItem[] = response.projects.map((project: ProjectData, index: number) => ({
            image: project.cover_image_url || generateProjectIcon(project.id || index, index),
            link: project.project_url || '#',
            title: project.title || 'Project',
            description: project.description || 'No description available'
          }))
          
          console.log('PastProjects: Mapped projects:', mappedProjects)
          setProjects(mappedProjects)
        } else {
          console.warn('PastProjects: No projects found in API response, using fallback', response)
          // Keep using fallback projects if API returns empty or fails
          setProjects(fallbackProjects)
        }
      } catch (error) {
        console.error('PastProjects: Error fetching projects:', error)
        // Keep using fallback projects on error
        setProjects(fallbackProjects)
      }
    }

    // Fetch projects after a short delay to avoid blocking initial render
    setTimeout(fetchProjects, 100)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 relative overflow-hidden"
    >
      <SectionParticles particleCount={170} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4 animate-fade-in">
            Our Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
            Past Projects
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-8 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow"></span>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore our successfully delivered projects that showcase our versatility, innovation, and commitment to excellence.
          </p>
        </div>

        <div className={`${isVisible ? 'animate-fade-in' : ''}`}>
          {projects.length > 0 ? (
            <div style={{ height: '600px', position: 'relative' }} className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-2 border-white/10 dark:border-gray-700/20 backdrop-saturate-150">
              <InfiniteMenu items={projects} />
            </div>
          ) : (
            <div style={{ height: '600px', position: 'relative' }} className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 dark:bg-gray-800/5 border-2 border-white/10 dark:border-gray-700/20 backdrop-saturate-150 flex items-center justify-center">
              <div className="text-white text-lg">No projects available</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
