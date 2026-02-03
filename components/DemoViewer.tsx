'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DemoType } from './DemoSelector'
import AndesTrekDemo from './demos/AndesTrekDemo'
import TravelJourneyDemo from './demos/TravelJourneyDemo'
import MNTNDemo from './demos/MNTNDemo'
import PatagoniaDemo from './demos/PatagoniaDemo'

interface DemoViewerProps {
  activeDemo: DemoType
}

export default function DemoViewer({ activeDemo }: DemoViewerProps) {
  // Resetear scroll cuando cambia el demo
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeDemo])

  const renderDemo = () => {
    switch (activeDemo) {
      case 'page-1':
        return <AndesTrekDemo />
      case 'page-2':
        return <TravelJourneyDemo />
      case 'page-3':
        return <MNTNDemo />
      case 'page-4':
        return <PatagoniaDemo />
      default:
        return <AndesTrekDemo />
    }
  }

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderDemo()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
