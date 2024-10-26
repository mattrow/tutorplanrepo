import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Logo from './Logo'

interface NavigationProps {
  showBackButton?: boolean;
  isAuthenticated?: boolean;
}

export default function Navigation({ showBackButton = false, isAuthenticated = false }: NavigationProps) {
  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        {/* Middle: Navigation Items (Centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <nav className="hidden md:flex items-center space-x-2">
            {['Blog', 'About', 'FAQ'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`}
                className="font-satoshi-medium px-4 py-2 text-white rounded-lg 
                  transition-colors duration-200 hover:bg-blue-500/20"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex-1 flex justify-end">
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button 
                  className="bg-white text-blue-800 hover:bg-white/90 font-satoshi-bold rounded-full px-6"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    className="bg-blue-800 text-white hover:bg-blue-700 font-satoshi-bold rounded-full px-6"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="bg-white text-blue-800 hover:bg-white/90 hover:scale-105 font-satoshi-boldtransition-all duration-200 rounded-full px-6"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
