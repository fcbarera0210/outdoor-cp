import Header from './Header'
import Footer from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="font-body text-gray-700 bg-brand-light dark:bg-[rgb(var(--background-rgb))] min-h-screen overflow-x-hidden">
      <main className="relative">
        {children}
      </main>
      <Header />
      <Footer />
    </div>
  )
}
