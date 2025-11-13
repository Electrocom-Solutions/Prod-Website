'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Particles from './Particles'

// Define particle colors outside component to avoid recreation
// Using plain blue and white colors for dark theme (no purple)
const PARTICLE_COLORS = ['#ffffff', '#60a5fa', '#3b82f6', '#2563eb', '#1e40af']

export default function GlobalParticles() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [particlesLoaded, setParticlesLoaded] = useState(false)
  const [particlesError, setParticlesError] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Memoize particle count to avoid recreating on every render
  // Increased particle count for better visibility
  const particleCount = useMemo(() => isMobile ? 600 : 1200, [isMobile])
  const particleBaseSize = useMemo(() => isMobile ? 80 : 100, [isMobile])

  // Memoize callbacks to prevent Particles component from re-initializing
  const handleLoadSuccess = useCallback(() => {
    setParticlesLoaded(true)
    setParticlesError(false)
  }, [])

  const handleLoadError = useCallback((error: Error) => {
    console.error('GlobalParticles: Failed to load particles:', error)
    setParticlesError(true)
    setParticlesLoaded(false)
  }, [])

  // Always render the background, even if not mounted yet
  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0f172a',
      }}
    >
      {/* Particles - only render when mounted */}
      {mounted && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 2 }}
    >
      <Particles
            particleColors={PARTICLE_COLORS}
            particleCount={particleCount}
            particleSpread={25}
            speed={0.18}
            particleBaseSize={particleBaseSize}
            sizeRandomness={1.5}
        moveParticlesOnHover={true}
            particleHoverFactor={3.5}
        alphaParticles={true}
        disableRotation={false}
        useWindowEvents={true}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
      />
        </div>
      )}
    </div>
  )
}

