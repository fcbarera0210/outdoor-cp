'use client'

import { useState } from 'react'
import DemoSelector, { type DemoType } from '@/components/DemoSelector'
import DemoViewer from '@/components/DemoViewer'

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('page-1')

  return (
    <main className="min-h-screen bg-white">
      <DemoSelector activeDemo={activeDemo} onDemoChange={setActiveDemo} />
      <DemoViewer activeDemo={activeDemo} />
    </main>
  )
}
