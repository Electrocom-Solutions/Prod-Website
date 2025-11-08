'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Particles from './Particles'

// Define particle colors outside component to avoid recreation
// Using plain blue and white colors for dark theme (no purple)
const PARTICLE_COLORS = ['#ffffff', '#60a5fa', '#3b82f6', '#2563eb', '#1e40af']

interface SectionParticlesProps {
  particleCount?: number
  className?: string
}

export default function SectionParticles({ particleCount = 150, className = '' }: SectionParticlesProps) {
  const [mounted, setMounted] = useState(false)
  const [particlesLoaded, setParticlesLoaded] = useState(false)
  const [particlesError, setParticlesError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize actual particle count to avoid recalculation
  const actualParticleCount = useMemo(() => particleCount * 2, [particleCount])

  // Memoize callbacks to prevent Particles component from re-initializing
  const handleLoadSuccess = useCallback(() => {
    setParticlesLoaded(true)
    setParticlesError(false)
  }, [])

  const handleLoadError = useCallback((error: Error) => {
    console.error('SectionParticles: Failed to load particles:', error)
    setParticlesError(true)
    setParticlesLoaded(false)
  }, [])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 w-full h-full -z-0 overflow-hidden ${className}`}>
      {/* Plain dark blue background for sections */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(15, 23, 42, 0.5)',
          zIndex: 1,
        }}
      />
      
      {/* Particles - always render, show when loaded */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
      >
        <Particles
          particleColors={PARTICLE_COLORS}
          particleCount={actualParticleCount}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={70}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          disableRotation={false}
          useWindowEvents={true}
          className="opacity-60"
          onLoadSuccess={handleLoadSuccess}
          onLoadError={handleLoadError}
        />
      </div>
    </div>
  )
}

