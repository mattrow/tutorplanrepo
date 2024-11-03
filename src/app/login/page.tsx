"use client"
import Navigation from '@/components/ui/Navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { handleGoogleAuth } from '@/utils/auth/googleSignIn'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error) {
      console.error('Error signing in', error)
      // TODO: Add user-friendly error handling
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleAuth();
      router.push("/dashboard");
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert(error instanceof Error ? error.message : 'An error occurred during Google sign-in');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#396afc] to-[#2948ff]">
      <div className="relative min-h-screen">
        <Navigation showBackButton={true} />
        <main className="flex items-center justify-center px-4 pt-32 pb-16">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
            <form onSubmit={handleLogin}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-satoshi-black text-white text-center">Log in to your account</CardTitle>
                <CardDescription className="text-center text-white/80 font-satoshi-medium">
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Email</Label>
                  <Input 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white/90">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-white hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password" 
                    type="password" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white focus:ring-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-[#396afc]" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-white/90 leading-none"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-white text-[#396afc] hover:bg-white/90 font-satoshi-bold rounded-full">
                  Log In
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-2 text-white/60">Or continue with</span>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-gray-700 hover:bg-white/90 rounded-full"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>
                <p className="text-sm text-center text-white/80">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-white hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  )
}