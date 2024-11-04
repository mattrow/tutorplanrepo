import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Logo from './Logo'

interface PublicNavigationProps {
  showBackButton?: boolean;
  isAuthenticated?: boolean;
}

export default function PublicNavigation({ showBackButton = false, isAuthenticated = false }: PublicNavigationProps) {
  return (
    <header className="absolute top-0 z-50 w-full bg-[#396afc]">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex-1 flex justify-end">
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button 
                  className="bg-white text-[#396afc] hover:bg-white/90 font-satoshi-bold rounded-full px-6"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    className="bg-transparent text-white border border-white/20 hover:bg-white/10 font-satoshi-bold rounded-full px-6"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button 
                    className="bg-white text-[#396afc] hover:bg-white/90 hover:scale-105 font-satoshi-bold transition-all duration-200 rounded-full px-6"
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