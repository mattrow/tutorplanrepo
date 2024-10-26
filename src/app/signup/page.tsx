"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Navigation from '@/components/Navigation'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '@/firebase/config';

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match") // TODO: Replace with a more user-friendly error message
      return
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard")
    } catch (error) {
      console.error('Error signing up', error);
      alert(error instanceof Error ? error.message : 'An error occurred during registration');
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register Google user');
      }

      router.push("/dashboard");
    } catch (error) {
      console.error('Error signing up with Google:', error);
      alert(error instanceof Error ? error.message : 'An error occurred during registration');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#396afc] to-[#2948ff]">
      <div className="relative min-h-screen">
        <Navigation showBackButton={true} />
        <main className="flex items-center justify-center px-4 pt-32 pb-16">
          <Card className="w-full max-w-md bg-white border-none shadow-lg">
            <form onSubmit={handleSignup}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-satoshi-black text-gray-900 text-center">Create an account</CardTitle>
                <CardDescription className="text-center text-gray-500 font-satoshi-medium">
                  Enter your details below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    onChange={(e) => setEmail(e.target.value)} 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="password" 
                    type="password" 
                    className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-gray-700">Confirm Password</Label>
                  <Input 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    id="confirm-password" 
                    type="password" 
                    className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-700 leading-none"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 font-satoshi-bold rounded-full">
                  Create Account
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-full"
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
                  Sign up with Google
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign in
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
