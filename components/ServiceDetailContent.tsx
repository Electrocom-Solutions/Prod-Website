'use client'

type ServiceDetailContentProps = {
  aboutTitle: string
  aboutText: string
  servicesTitle?: string
  services: string[]
}

export default function ServiceDetailContent({
  aboutTitle,
  aboutText,
  servicesTitle = 'What we offer',
  services,
}: ServiceDetailContentProps) {
  return (
    <div className="space-y-10">
      {/* About card */}
      <article className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden">
        <div className="p-6 md:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {aboutTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {aboutText}
          </p>
        </div>
      </article>

      {/* Services / features grid */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          {servicesTitle}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="list">
          {services.map((item, index) => (
            <li
              key={index}
              className="group flex items-start gap-3 p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 hover:border-primary-200 dark:hover:border-primary-500/40 hover:bg-primary-50/30 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              <span
                className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 dark:bg-primary-500/30 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-snug">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
