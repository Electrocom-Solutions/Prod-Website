'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SectionParticles from '@/components/SectionParticles'
import ContactUs from '@/components/ContactUs'

const testimonials = [
  {
    quote:
      'Electrocom delivered our custom ERP solution on time and within budget. Their team understood our requirements from day one and the support has been exceptional.',
    name: 'Rajesh Kumar',
    role: 'Operations Director',
    company: 'Manufacturing & Logistics',
    rating: 5,
  },
  {
    quote:
      'We partnered with Electrocom for our cloud migration. The architecture they designed is scalable, secure, and has significantly reduced our infrastructure costs.',
    name: 'Priya Sharma',
    role: 'CTO',
    company: 'FinTech Startup',
    rating: 5,
  },
  {
    quote:
      'From UI/UX design to deployment, Electrocom handled our e-commerce platform end-to-end. Our conversion rates improved and the user experience is outstanding.',
    name: 'Amit Patel',
    role: 'Founder',
    company: 'E-Commerce Brand',
    rating: 5,
  },
  {
    quote:
      'Their AI solutions team helped us automate critical workflows. The custom models they built have saved us hundreds of hours and improved accuracy dramatically.',
    name: 'Sneha Reddy',
    role: 'Head of Analytics',
    company: 'Healthcare Provider',
    rating: 5,
  },
  {
    quote:
      'Professional, responsive, and technically excellent. Electrocom built our mobile app and the feedback from our users has been overwhelmingly positive.',
    name: 'Vikram Singh',
    role: 'Product Manager',
    company: 'EdTech Platform',
    rating: 5,
  },
  {
    quote:
      'We needed a reliable partner for DevOps and cloud hosting. Electrocom set up our CI/CD pipeline and monitoring—releases are now smooth and incidents are rare.',
    name: 'Kavita Nair',
    role: 'Engineering Lead',
    company: 'SaaS Company',
    rating: 5,
  },
]

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: stars }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsPage() {
  const [isVisible, setIsVisible] = useState(false)
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
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <div className="min-h-screen bg-transparent">
      <SectionParticles particleCount={200} />

      {/* Hero — split layout with featured quote */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background: single radial glow, no busy orbs */}
        <div className="absolute inset-0 z-0 bg-[#0f172a]" />
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59, 130, 246, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 50%)',
          }}
        />
        {/* Large decorative quote */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-serif leading-none text-white/[0.03] select-none pointer-events-none z-0"
          aria-hidden
        >
          &ldquo;
        </span>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline + CTA */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-400 mb-4">
                Client Testimonials
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                What Our{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-cyan-300">
                  Clients
                </span>{' '}
                Say
              </h1>
              <p className="text-lg text-slate-300 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                Real stories from teams who chose Electrocom. See why they trust us with software, cloud, and IT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#testimonials-section"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Read Testimonials
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
                <Link
                  href="/get-quote"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            {/* Right: featured testimonial card */}
            <div className="order-1 lg:order-2">
              <article className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
                <div className="absolute -top-3 -left-1 text-6xl text-primary-400/30 font-serif leading-none select-none" aria-hidden>
                  &ldquo;
                </div>
                <StarRating stars={5} />
                <blockquote className="mt-4 text-slate-200 text-lg sm:text-xl leading-relaxed">
                  Electrocom delivered our custom ERP solution on time and within budget. Their team understood our requirements from day one and the support has been exceptional.
                </blockquote>
                <footer className="mt-6 pt-4 border-t border-white/10">
                  <p className="font-semibold text-white">Rajesh Kumar</p>
                  <p className="text-sm text-primary-300/90">Operations Director · Manufacturing & Logistics</p>
                </footer>
              </article>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#testimonials-section"
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-primary-400 transition-colors"
              aria-label="Scroll to testimonials"
            >
              <span className="text-xs font-medium uppercase tracking-wider">See all</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Client Testimonials — What Our Clients Say */}
      <section
        id="testimonials-section"
        ref={sectionRef}
        className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100/50 dark:bg-primary-900/30 rounded-full px-4 py-2 mb-4">
              Client Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
              What Our Clients Say
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-transparent via-primary-600 dark:via-primary-400 to-transparent mx-auto mb-4 relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse-slow" />
            </div>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Hear from organizations that have partnered with us for software development, cloud, and IT solutions.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${isVisible ? 'animate-fade-in' : ''}`}
          >
            {testimonials.map((t, index) => (
              <article
                key={index}
                className="group relative flex flex-col backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-white/20 dark:border-gray-700/30 hover:shadow-[0_25px_60px_-25px_rgba(59,130,246,0.35)] transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute top-6 right-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-10 h-10 text-primary-400/40"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <StarRating stars={t.rating} />
                <blockquote className="mt-4 flex-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
                  <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">{t.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.company}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactUs
        badge="Let's Talk"
        title="Ready to Become a Success Story?"
        subtitle="Join the teams that trust Electrocom. Share your project and we'll get back to you soon."
      />
    </div>
  )
}
