import Logo from './Logo'
import Link from 'next/link'
import { auth } from '@/firebase/config'
import { useAuth } from '@/hooks/useAuth'

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400">Empowering tutors with AI-generated lesson plans.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:contact@wpaindustries.com" 
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0ac4b66d-c3f4-4c01-bef6-e08994ea1ab1" 
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://app.termly.io/policy-viewer/policy.html?policyUUID=20d721ff-a8c7-4728-8efe-893413a2cca1" 
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
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
