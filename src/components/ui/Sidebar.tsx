import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  UserPlus, 
  MessageSquare, 
  Star, 
  Settings
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

export default function Sidebar() {
  const pathname = usePathname()

  const isActiveLink = (path: string) => {
    return pathname === path ? 'bg-white/10' : ''
  }

  return (
    <div className="w-64 bg-gradient-to-b from-[#396afc] to-[#2948ff] h-screen fixed left-0 top-0 text-white flex flex-col">
      {/* Logo Area */}
      <div className="p-6 flex justify-center">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      {/* Add Student Button */}
      <div className="px-4 mb-8">
        <Button 
          className="w-full bg-white text-[#396afc] hover:bg-white/90 font-satoshi-bold rounded-full flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-4">
        <nav className="space-y-2">
          <Link href="/dashboard">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${isActiveLink('/dashboard')}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-satoshi-medium">Dashboard</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Bottom Links */}
      <div className="px-4 mb-6">
        <div className="space-y-2">
          <Link href="/contact">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="font-satoshi-medium">Contact</span>
            </div>
          </Link>
          <Link href="/rate">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Star className="w-5 h-5" />
              <span className="font-satoshi-medium">Rate Us</span>
            </div>
          </Link>
          <Link href="/settings">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-satoshi-medium">Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
