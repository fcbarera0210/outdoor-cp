'use client'

import { motion } from 'framer-motion'

export type DemoType = 'page-1' | 'page-2' | 'page-3' | 'page-4'

interface DemoSelectorProps {
  activeDemo: DemoType
  onDemoChange: (demo: DemoType) => void
}

const demos = [
  { id: 'page-1' as DemoType, name: 'Andes Trek', description: 'Diseño Rústico' },
  { id: 'page-2' as DemoType, name: 'Travel Journey', description: 'Diseño Geométrico' },
  { id: 'page-3' as DemoType, name: 'MNTN', description: 'Diseño Oscuro/Elegante' },
  { id: 'page-4' as DemoType, name: 'Patagonia', description: 'Diseño Moderno/Colorido' },
]

export default function DemoSelector({ activeDemo, onDemoChange }: DemoSelectorProps) {
  return (
    <div className="demo-selector-container">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop View - Tabs */}
        <div className="hidden md:flex items-center justify-center gap-2">
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              onClick={() => onDemoChange(demo.id)}
              className={`
                relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                ${activeDemo === demo.id
                  ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                  : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeDemo === demo.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{demo.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Mobile View - Compact Tabs */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {demos.map((demo) => (
              <motion.button
                key={demo.id}
                onClick={() => onDemoChange(demo.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 whitespace-nowrap
                  ${activeDemo === demo.id
                    ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                  }
                `}
                whileTap={{ scale: 0.95 }}
              >
                {demo.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Demo Indicator */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Vista previa: <span className="font-semibold text-gray-700">
              {demos.find(d => d.id === activeDemo)?.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
