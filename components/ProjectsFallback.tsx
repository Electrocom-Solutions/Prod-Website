'use client'

interface ProjectsFallbackProps {
  items: Array<{
    image: string
    link: string
    title: string
    description: string
  }>
}

export default function ProjectsFallback({ items }: ProjectsFallbackProps) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center max-w-md backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 rounded-2xl border border-white/20 dark:border-gray-700/30 p-8">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-white mb-2">3D Interactive Menu</h3>
          <p className="text-gray-300 text-sm mb-4">
            The InfiniteMenu component requires the <code className="text-primary-400">gl-matrix</code> package to be installed.
          </p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
          <p className="text-gray-400 text-xs mb-2">To enable the 3D interactive menu, run:</p>
          <code className="text-primary-400 text-sm block">npm install gl-matrix</code>
        </div>
        <p className="text-gray-400 text-xs">
          Once installed, the interactive 3D sphere menu will appear here, allowing you to explore projects by dragging and rotating.
        </p>
      </div>
    </div>
  )
}

