'use client'

import React, { useEffect, useRef } from 'react'
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl'

interface ParticlesProps {
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleColors?: string[]
  moveParticlesOnHover?: boolean
  particleHoverFactor?: number
  alphaParticles?: boolean
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  disableRotation?: boolean
  useWindowEvents?: boolean
  className?: string
  onLoadError?: (error: Error) => void
  onLoadSuccess?: () => void
}

const defaultColors: string[] = ['#ffffff', '#ffffff', '#ffffff']

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }
  const int = parseInt(hex, 16)
  const r = ((int >> 16) & 255) / 255
  const g = ((int >> 8) & 255) / 255
  const b = (int & 255) / 255
  return [r, g, b]
}

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    if (uSizeRandomness == 0.0) {
      gl_PointSize = uBaseSize;
    } else {
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    }
    gl_Position = projectionMatrix * mvPos;
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  useWindowEvents = false,
  className,
  onLoadError,
  onLoadSuccess
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const hasInitialized = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Reset initialization flag
    hasInitialized.current = false

    // Ensure container has dimensions
    const ensureDimensions = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        // Use viewport dimensions if container has no size
        const width = window.innerWidth
        const height = window.innerHeight
        container.style.width = `${width}px`
        container.style.height = `${height}px`
      }
    }
    ensureDimensions()

    let renderer: Renderer
    let camera: Camera

    try {
      renderer = new Renderer({ depth: false, alpha: true })

      // Check if WebGL is actually supported
      if (!renderer.gl) {
        throw new Error('WebGL is not supported')
      }
    } catch (error) {
      console.error('Particles: Failed to initialize WebGL:', error)
      if (onLoadError) {
        onLoadError(error instanceof Error ? error : new Error('WebGL initialization failed'))
      }
      hasInitialized.current = false
      return
    }
    
    const gl = renderer.gl
    
    // Ensure canvas is properly styled for mobile
    // Check if canvas is HTMLCanvasElement (not OffscreenCanvas) before accessing style
    if (gl.canvas instanceof HTMLCanvasElement) {
      gl.canvas.style.display = 'block'
      gl.canvas.style.width = '100%'
      gl.canvas.style.height = '100%'
      gl.canvas.style.position = 'absolute'
      gl.canvas.style.top = '0'
      gl.canvas.style.left = '0'
      gl.canvas.style.pointerEvents = 'none'
      gl.canvas.style.touchAction = 'none'
    }
    
    try {
      // Only append if it's an HTMLCanvasElement
      if (gl.canvas instanceof HTMLCanvasElement) {
        container.appendChild(gl.canvas)
      } else {
        throw new Error('Canvas is not an HTMLCanvasElement')
      }
      gl.clearColor(0, 0, 0, 0)

      camera = new Camera(renderer.gl, { fov: 15 })
      camera.position.set(0, 0, cameraDistance)
    } catch (error) {
      console.error('Particles: Failed to setup canvas or camera:', error)
      if (onLoadError) {
        onLoadError(error instanceof Error ? error : new Error('Canvas setup failed'))
      }
      hasInitialized.current = false
      return
    }

    const resize = () => {
      if (!renderer || !camera) return
      
      ensureDimensions()
      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight
      
      // Ensure minimum dimensions
      if (width > 0 && height > 0) {
        renderer.setSize(width, height)
        const aspect = width / height
        if (aspect > 0 && isFinite(aspect)) {
          camera.perspective({ aspect })
        }
      }
    }

    window.addEventListener('resize', resize, false)
    window.addEventListener('orientationchange', resize, false)
    
    // Initial resize with delay to ensure DOM is ready
    // Use multiple attempts to ensure dimensions are set
    const initResize = () => {
      resize()
      // Retry if dimensions are still invalid
      setTimeout(() => {
        const width = container.clientWidth || window.innerWidth
        const height = container.clientHeight || window.innerHeight
        if (width > 0 && height > 0 && renderer && camera) {
          resize()
        } else {
          // Retry once more
          setTimeout(resize, 100)
        }
      }, 50)
    }
    
    // Use requestAnimationFrame to ensure DOM is painted
    requestAnimationFrame(() => {
      initResize()
    })

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      let clientX: number, clientY: number
      
      if (e instanceof TouchEvent && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if (e instanceof MouseEvent) {
        clientX = e.clientX
        clientY = e.clientY
      } else {
        return
      }
      
      const x = ((clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1)
      mouseRef.current = { x, y }
    }

    const handleWindowMouseMove = (e: MouseEvent | TouchEvent) => {
      let clientX: number, clientY: number
      
      if (e instanceof TouchEvent && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if (e instanceof MouseEvent) {
        clientX = e.clientX
        clientY = e.clientY
      } else {
        return
      }
      
      const x = (clientX / window.innerWidth) * 2 - 1
      const y = -((clientY / window.innerHeight) * 2 - 1)
      mouseRef.current = { x, y }
    }

    if (moveParticlesOnHover) {
      // Use window events for global particles, container events for section particles
      if (useWindowEvents) {
        window.addEventListener('mousemove', handleWindowMouseMove, { passive: true })
        window.addEventListener('touchmove', handleWindowMouseMove, { passive: true })
      } else {
        container.addEventListener('mousemove', handleMouseMove, { passive: true })
        container.addEventListener('touchmove', handleMouseMove, { passive: true })
      }
    }

    const count = particleCount
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count * 4)
    const colors = new Float32Array(count * 3)
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors

    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number, len: number
      do {
        x = Math.random() * 2 - 1
        y = Math.random() * 2 - 1
        z = Math.random() * 2 - 1
        len = x * x + y * y + z * z
      } while (len > 1 || len === 0)

      const r = Math.cbrt(Math.random())
      positions.set([x * r, y * r, z * r], i * 3)
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4)
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)])
      colors.set(col, i * 3)
    }

    let geometry: Geometry | null = null
    let program: Program | null = null
    let particles: Mesh | null = null

    try {
      geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors }
      })

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpread: { value: particleSpread },
          uBaseSize: { value: particleBaseSize },
          uSizeRandomness: { value: sizeRandomness },
          uAlphaParticles: { value: alphaParticles ? 1 : 0 }
        },
        transparent: true,
        depthTest: false
      })

      particles = new Mesh(gl, { mode: gl.POINTS, geometry, program })
    } catch (error) {
      console.error('Particles: Failed to create geometry/program/mesh:', error)
      if (onLoadError) {
        onLoadError(error instanceof Error ? error : new Error('Particle setup failed'))
      }
      hasInitialized.current = false
      return
    }

    let animationFrameId: number
    let lastTime = performance.now()
    let elapsed = 0
    let hasRendered = false
    let initTimeout: NodeJS.Timeout | null = null

    const update = (t: number) => {
      try {
        if (!renderer || !camera || !particles || !program) return
        
        animationFrameId = requestAnimationFrame(update)
        const delta = t - lastTime
        lastTime = t
        elapsed += delta * speed
        if (program && program.uniforms && program.uniforms.uTime) {
          program.uniforms.uTime.value = elapsed * 0.001
        }

        if (moveParticlesOnHover) {
          particles.position.x = -mouseRef.current.x * particleHoverFactor
          particles.position.y = -mouseRef.current.y * particleHoverFactor
        } else {
          particles.position.x = 0
          particles.position.y = 0
        }

        if (!disableRotation) {
          particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1
          particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15
          particles.rotation.z += 0.01 * speed
        }

        renderer.render({ scene: particles, camera })
        
        // Mark as successfully initialized after first render
        if (!hasRendered) {
          hasRendered = true
          hasInitialized.current = true
          if (initTimeout) {
            clearTimeout(initTimeout)
            initTimeout = null
          }
          // Call onLoadSuccess in next tick to ensure render is complete
          setTimeout(() => {
            if (onLoadSuccess) {
              onLoadSuccess()
            }
          }, 0)
        }
      } catch (error) {
        console.error('Particles: Error during animation:', error)
        cancelAnimationFrame(animationFrameId)
        if (initTimeout) {
          clearTimeout(initTimeout)
          initTimeout = null
        }
        if (!hasInitialized.current && onLoadError) {
          onLoadError(error instanceof Error ? error : new Error('Animation failed'))
        }
        hasInitialized.current = false
      }
    }

    // Set a timeout to detect if particles fail to initialize
    initTimeout = setTimeout(() => {
      if (!hasInitialized.current && !hasRendered) {
        console.error('Particles: Timeout - particles failed to initialize')
        if (onLoadError) {
          onLoadError(new Error('Particle initialization timeout'))
        }
      }
      initTimeout = null
    }, 3000) // 3 second timeout

    try {
      animationFrameId = requestAnimationFrame(update)
    } catch (error) {
      if (initTimeout) {
        clearTimeout(initTimeout)
        initTimeout = null
      }
      console.error('Particles: Failed to start animation:', error)
      if (onLoadError) {
        onLoadError(error instanceof Error ? error : new Error('Animation start failed'))
      }
      hasInitialized.current = false
      return
    }

    return () => {
      if (initTimeout) {
        clearTimeout(initTimeout)
        initTimeout = null
      }
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
      if (moveParticlesOnHover) {
        window.removeEventListener('mousemove', handleWindowMouseMove)
        window.removeEventListener('touchmove', handleWindowMouseMove)
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('touchmove', handleMouseMove)
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (gl && gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas)
      }
    }
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    useWindowEvents,
    particleColors,
    onLoadError,
    onLoadSuccess
  ])

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full ${className || ''}`}
      style={{ 
        minWidth: '100%', 
        minHeight: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    />
  )
}

export default Particles

