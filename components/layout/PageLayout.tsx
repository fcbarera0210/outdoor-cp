import Header from './Header'
import Footer from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
  darkOverlay?: boolean
}

export default function PageLayout({ children, darkOverlay = true }: PageLayoutProps) {
  return (
    <div className="font-body text-gray-700 bg-brand-light min-h-screen">
      <Header darkOverlay={darkOverlay} />
      <main className="relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}
