import Logo from './Logo'
import Link from 'next/link'
import { auth } from '@/firebase/config'
import { useAuth } from '@/hooks/useAuth'

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400">Empowering tutors with AI-generated lesson plans.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#demo" className="hover:text-white transition-colors">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              {user && (
                <li>
                  <button
                    onClick={() => auth.signOut()}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 TutorPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
