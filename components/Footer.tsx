'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden text-white bg-[#0f172a] min-h-screen flex flex-col">
      {/* When scrolled to bottom, footer fills viewport so you see only footer (no cut-off Contact Us) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-slate-900/95 to-[#0f172a]" />
      <div className="absolute -top-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/20 via-primary-400/15 to-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-14">
        {/* Layer 1: CTA — distinct, floating section with generous spacing */}
        <section className="flex-shrink-0 pt-8 lg:pt-12 pb-12 lg:pb-16">
          <div className="rounded-2xl border border-white/20 dark:border-gray-700/30 bg-white/5 dark:bg-gray-800/30 backdrop-blur-xl shadow-xl p-8 lg:p-10 min-h-[7rem] flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="max-w-2xl">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-300 leading-tight">
                  Ready to Transform Your Business?
                </h3>
                <p className="mt-2 text-base text-white/70 leading-relaxed">
                  Get expert guidance on software development, cloud, and IT solutions tailored to your goals.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 transition-all shadow-lg border border-primary-400/20"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white/90 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-primary-400/30 transition-all"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Layer 2: Footer grid — logo + links, top-aligned, spacious */}
        <section className="flex-1 flex flex-col justify-center min-h-0 pt-4 lg:pt-0 pb-10 lg:pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-8 lg:gap-y-10 items-start">
            {/* Brand + trust stats */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/logos/logo only.png"
                  alt="Electrocom Logo"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <img
                  src="/logos/Electrocom Text.png"
                  alt="Electrocom"
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="mt-3 text-base text-white/70 leading-relaxed max-w-sm">
                Your Trusted Partner for IT & Software Solutions.
              </p>
              {/* Trust stats — increased spacing, larger cards, aligned under brand */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] dark:bg-primary-500/5 p-4 text-center">
                  <div className="text-xl md:text-2xl font-bold text-white leading-tight">20+</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60 mt-1">Projects</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] dark:bg-primary-500/5 p-4 text-center">
                  <div className="text-xl md:text-2xl font-bold text-white leading-tight">100%</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60 mt-1">Satisfaction</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] dark:bg-primary-500/5 p-4 text-center">
                  <div className="text-xl md:text-2xl font-bold text-white leading-tight">24/7</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/60 mt-1">Support</div>
                </div>
              </div>
            </div>

            {/* Columns — same top baseline, relaxed line-height */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold tracking-wide text-primary-400/90 uppercase">Services</h4>
              <ul className="mt-3 space-y-2.5 text-sm text-white/70 leading-relaxed">
                <li>
                  <Link href="/services/software-solutions/custom-ai-solutions" className="hover:text-primary-300 transition-colors">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-solutions/custom-software-development" className="hover:text-primary-300 transition-colors">
                    Custom Software
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-solutions/web-development" className="hover:text-primary-300 transition-colors">
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-solutions/mobile-app-development" className="hover:text-primary-300 transition-colors">
                    Mobile Apps
                  </Link>
                </li>
                <li>
                  <Link href="/services/software-solutions/cloud-architecture" className="hover:text-primary-300 transition-colors">
                    Cloud Services
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary-300 transition-colors">
                    Consulting
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold tracking-wide text-primary-400/90 uppercase">Company</h4>
              <ul className="mt-3 space-y-2.5 text-sm text-white/70 leading-relaxed">
                <li>
                  <Link href="/#about" className="hover:text-primary-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-primary-300 transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-primary-300 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="hover:text-primary-300 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/#technologies" className="hover:text-primary-300 transition-colors">
                    Technologies
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-primary-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold tracking-wide text-primary-400/90 uppercase">Products</h4>
              <ul className="mt-3 space-y-2.5 text-sm text-white/70 leading-relaxed">
                <li>
                  <Link href="/projects" className="hover:text-primary-300 transition-colors">
                    SolvifyHub
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold tracking-wide text-primary-400/90 uppercase">Tools</h4>
              <ul className="mt-3 space-y-2.5 text-sm text-white/70 leading-relaxed">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.location.href = '/#contact'
                      }
                    }}
                    className="hover:text-primary-300 transition-colors text-left"
                  >
                    Get Quote
                  </button>
                </li>
                <li>
                  <Link href="/book-consultation" className="hover:text-primary-300 transition-colors">
                    Book Meeting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Copyright bar — clear separation from footer grid */}
        <section className="flex-shrink-0 pt-8 lg:pt-10 pb-6 lg:pb-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60 leading-relaxed">
          <p>&copy; {new Date().getFullYear()} Electrocom. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a
              href="https://www.linkedin.com/in/vaibhavpaliwal1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.3 8.01H4.7V24H.3V8.01zM8.44 8.01H12.6V9.8h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.68V24h-4.4v-8.02c0-1.91-.03-4.37-2.66-4.37-2.66 0-3.07 2.08-3.07 4.23V24H8.44V8.01z" />
                </svg>
              </a>
              <a
                href="https://github.com/Vaibhav6200"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.9 0-1.3.47-2.37 1.24-3.2-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.67 1.65.25 2.87.13 3.17.77.83 1.23 1.9 1.23 3.2 0 4.58-2.8 5.6-5.48 5.9.43.37.81 1.1.81 2.22 0 1.6-.01 2.88-.01 3.27 0 .32.22.7.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vaibhavpaliwal620"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-300 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3zm10 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
          </div>
        </section>
      </div>
    </footer>
  )
}
