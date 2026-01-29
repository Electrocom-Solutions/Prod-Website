'use client'

import { useEffect, useRef, useState } from 'react'
import SectionParticles from '@/components/SectionParticles'
import ContactUs from '@/components/ContactUs'
import { portfolioAPI, ProductData } from '@/lib/api'

/** Derive up to 3 short bullet points from major_description (lines or sentences). */
function getKeyPoints(majorDescription: string): string[] {
  const trimmed = majorDescription.trim()
  if (!trimmed) return []
  const truncate = (s: string) => (s.length > 72 ? s.slice(0, 69) + '…' : s)
  const byLines = trimmed.split(/\n+/).map((s) => s.trim()).filter(Boolean)
  if (byLines.length > 0) return byLines.slice(0, 3).map(truncate)
  const bySentence = trimmed.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean)
  return bySentence.slice(0, 3).map(truncate)
}

function ProductCard({ product, index }: { product: ProductData; index: number }) {
  const keyPoints = getKeyPoints(product.major_description)

  return (
    <article
      id={`product-${product.id}`}
      className="group relative flex h-full flex-col rounded-xl overflow-hidden bg-slate-800/40 border border-slate-600/30 shadow-md hover:shadow-lg hover:border-slate-500/40 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-400/40 focus-within:ring-offset-2 focus-within:ring-offset-slate-900"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Badge or Visit link — top-right, same position */}
      <div className="absolute top-4 right-4 z-10">
        {product.coming_soon ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/40">
            Coming Soon
          </span>
        ) : product.product_url ? (
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary-300 border border-primary-400/40 hover:bg-primary-500/30 hover:text-primary-200 hover:border-primary-400/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Visit
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : null}
      </div>

      {/* 1. Product icon / logo — top, ample spacing */}
      <div className="flex-shrink-0 pt-8 pb-6 px-8 flex items-center justify-center min-h-[140px]">
        {product.logo_url ? (
          <img
            src={product.logo_url}
            alt={`${product.name} logo`}
            className="max-h-20 w-auto object-contain select-none"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-700/50 text-slate-400">
            <span className="text-2xl font-semibold">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* 2–4. Name, value prop, key points — consistent padding */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-0 min-h-0">
        <h3 className="text-lg font-semibold text-white tracking-tight mb-1.5">
          {product.name}
        </h3>
        <p className="text-sm text-slate-400 leading-snug mb-4 line-clamp-2">
          {product.short_description}
        </p>
        {keyPoints.length > 0 && (
          <ul className="space-y-2 mb-6 flex-shrink-0">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                <span className="mt-1.5 flex-shrink-0 w-4 h-4 rounded-full bg-primary-500/20 flex items-center justify-center" aria-hidden>
                  <svg className="w-2.5 h-2.5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (el) observer.observe(el)
    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await portfolioAPI.getProducts()
        if (response.success && response.products.length > 0) {
          setProducts(response.products)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-transparent">
      <SectionParticles particleCount={200} />

      {/* Hero — same style as testimonials */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0f172a]" />
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59, 130, 246, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] md:text-[24rem] font-serif leading-none text-white/[0.03] select-none pointer-events-none z-0" aria-hidden>
          ◈
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-4">
            What we build
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-cyan-300">
              Products
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Software and platforms we’ve built to solve real problems. Explore what we offer and how it can help you.
          </p>
          <a
            href="#products-list"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View all products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <div className="mt-10 flex justify-center">
            <a
              href="#products-list"
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-primary-400 transition-colors"
              aria-label="Scroll to products"
            >
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Product catalog */}
      <section
        id="products-list"
        ref={sectionRef}
        className="relative z-10 py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/25 to-transparent pointer-events-none" aria-hidden />
        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <header className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2.5 text-sm font-bold text-primary-300 bg-primary-500/15 rounded-full px-5 py-2.5 mb-6 border border-primary-400/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Product catalog
              {!isLoading && products.length > 0 && (
                <span className="tabular-nums">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </span>
              )}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Explore our products
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500 rounded-full mx-auto mb-6" />
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Software and platforms built to solve real problems. Learn more below or visit each product.
            </p>
          </header>

          {isLoading ? (
            <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-600/30"
                >
                  <div className="h-48 sm:h-56 bg-slate-700/40 animate-pulse" />
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="h-3 w-28 bg-slate-600/50 rounded-full animate-pulse" />
                    <div className="h-7 w-2/3 bg-slate-600/50 rounded-lg animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-600/40 rounded animate-pulse" />
                      <div className="h-3 w-full bg-slate-600/40 rounded animate-pulse" />
                      <div className="h-3 w-4/5 bg-slate-600/40 rounded animate-pulse" />
                    </div>
                    <div className="pt-5 mt-5 border-t border-slate-600/40">
                      <div className="h-12 w-full max-w-[180px] bg-slate-600/50 rounded-xl animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div
              className={`grid gap-8 sm:gap-10 ${products.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'} ${isVisible ? 'animate-fade-in' : ''}`}
            >
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-20 px-8 rounded-2xl bg-slate-800/30 border border-slate-600/30">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary-500/20 flex items-center justify-center border border-primary-400/20">
                <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8 4-8-4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products yet</h3>
              <p className="text-slate-400">
                Products will appear here once they’re added. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <ContactUs
        badge="Get in touch"
        title="Interested in a product or custom build?"
        subtitle="Tell us what you need and we’ll help you find the right solution."
      />
    </div>
  )
}
