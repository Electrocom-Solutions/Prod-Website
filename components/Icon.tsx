import type { SVGProps } from 'react'

export type IconName =
  | 'wrench-screwdriver'
  | 'cpu-chip'
  | 'globe-alt'
  | 'users'
  | 'rocket'
  | 'bolt'
  | 'star'
  | 'building-office-2'
  | 'heart'
  | 'academic-cap'
  | 'factory'
  | 'building-office'
  | 'briefcase'
  | 'clipboard-document-check'
  | 'cube'
  | 'magnifying-glass'
  | 'chart-bar'
  | 'shopping-cart'
  | 'cloud'
  | 'cog-6-tooth'
  | 'device-phone-mobile'
  | 'camera'
  | 'wifi'
  | 'server'
  | 'printer'
  | 'document-text'
  | 'battery-100'
  | 'truck'

type Props = SVGProps<SVGSVGElement> & {
  name: IconName
}

// Minimal inline SVG set (Heroicons-like). Expand as needed.
export default function Icon({ name, className, ...props }: Props) {
  const cls = className ?? 'w-10 h-10'

  switch (name) {
    case 'wrench-screwdriver':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.42 2.53a7 7 0 00-3.2 11.75l-5.3 5.3a2 2 0 102.83 2.83l5.3-5.3A7 7 0 0019.47 12l-4.06 1.02-2.43-2.43L14 6.53 11.42 2.53z"
          />
        </svg>
      )
    case 'cpu-chip':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10H7V7z" />
        </svg>
      )
    case 'globe-alt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2c2.5 2.8 4 6.2 4 10s-1.5 7.2-4 10c-2.5-2.8-4-6.2-4-10s1.5-7.2 4-10z" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11a4 4 0 100-8 4 4 0 000 8z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 20v-1a3 3 0 00-2.2-2.9" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3.1a4 4 0 010 7.8" />
        </svg>
      )
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 14c-1 2-1 4-1 4s2 0 4-1l4 4 2-2-4-4c1-2 1-4 1-4l6-6c1-1 2-3 2-5-2 0-4 1-5 2l-6 6s-2 0-4 1l1 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l0.5 0.5" />
        </svg>
      )
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 18.9 5.8 22l1.2-6.8-5-4.9 6.9-1L12 2z"
          />
        </svg>
      )
    case 'building-office':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 21h16.5M4.5 21V6.75a1.5 1.5 0 013 0V21m-3-9h3m-3 0h3m-3 0h3m-6 0h3m-3 0h3m-3 0h3M3.75 21h16.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v16.5c0 .414.336.75.75.75z" />
        </svg>
      )
    case 'building-office-2':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h.01M9 10h.01M9 13h.01M12 7h.01M12 10h.01M12 13h.01M15 7h.01M15 10h.01M15 13h.01" />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s-8-4.5-8-11a5 5 0 018-3 5 5 0 018 3c0 6.5-8 11-8 11z" />
        </svg>
      )
    case 'academic-cap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3L2 8l10 5 10-5-10-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10v6c0 1 3 3 6 3s6-2 6-3v-6" />
        </svg>
      )
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18V10l-6 3V10l-6 3V6H3v15z" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V6a2 2 0 012-2h4a2 2 0 012 2v1" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
        </svg>
      )
    case 'clipboard-document-check':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5h6a2 2 0 012 2v14H7V7a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6v4H9V3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 14l1.5 1.5 3.5-3.5" />
        </svg>
      )
    case 'cube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l9 5-9 5-9-5 9-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10l9 5 9-5V7" />
        </svg>
      )
    case 'magnifying-glass':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.3-4.3" />
        </svg>
      )
    case 'chart-bar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
        </svg>
      )
    case 'shopping-cart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l2 12h11l2-8H7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 18h10a4 4 0 000-8 6 6 0 10-11 3" />
        </svg>
      )
    case 'cog-6-tooth':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.4 15a7.9 7.9 0 00.1-2l2-1.2-2-3.4-2.3.6a7.7 7.7 0 00-1.7-1L14.9 3h-3.8l-.6 2.4a7.7 7.7 0 00-1.7 1L6.5 6.8l-2 3.4 2 1.2a7.9 7.9 0 000 2l-2 1.2 2 3.4 2.3-.6a7.7 7.7 0 001.7 1l.6 2.4h3.8l.6-2.4a7.7 7.7 0 001.7-1l2.3.6 2-3.4-2-1.2z"
          />
        </svg>
      )
    case 'device-phone-mobile':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19h2" />
        </svg>
      )
    case 'camera':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      )
    case 'wifi':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 8.5a16 16 0 0120 0M5 12a11 11 0 0114 0M8.5 15.5a6 6 0 017 0" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19h.01" />
        </svg>
      )
    case 'server':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16v5H4V6zM4 13h16v5H4v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h.01M7 15h.01" />
        </svg>
      )
    case 'printer':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7V3h10v4" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 17h12v4H6v-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10h12a2 2 0 012 2v3h-3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 15H3v-3a2 2 0 012-2" />
        </svg>
      )
    case 'document-text':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h7l3 3v15H7V3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6M9 17h6M9 9h3" />
        </svg>
      )
    case 'battery-100':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10v4a2 2 0 002 2h13a2 2 0 002-2v-1h1v-2h-1v-1a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 11h10v2H6v-2z" />
        </svg>
      )
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h11v10H3V7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4l3 3v4h-7v-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19a1 1 0 100-2 1 1 0 000 2zM18 19a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      )
    default:
      return null
  }
}

