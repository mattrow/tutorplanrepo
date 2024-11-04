import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"

import "./globals.css";
import { AuthProvider } from "../hooks/useAuth";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "TutorPlan - Generate Lessons & Homework",
  description: "Create personalized learning paths and lesson plans instantly with AI. Keep your students motivated with tailored educational content generated with just one click.",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      type: 'image/png',
      sizes: '180x180',
    },
  },
  keywords: [
    'lesson planning',
    'AI teaching assistant',
    'education technology',
    'personalized learning',
    'teaching tools',
    'curriculum planning',
    'educational AI',
    'student engagement',
    'learning paths',
    'tutoring platform'
  ],
  authors: [{ name: 'TutorPlan' }],
  openGraph: {
    title: 'TutorPlan - Generate Lessons & Homework',
    description: 'Create personalized learning paths and lesson plans instantly with AI. Keep your students motivated with tailored educational content.',
    url: 'https://tutorplan.co', // Update this with your actual domain
    siteName: 'TutorPlan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TutorPlan - Personalized lessons with one click'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TutorPlan - Generate Lessons & Homework',
    description: 'Create personalized learning paths and lesson plans instantly with AI. Keep your students motivated with tailored educational content.',
    images: ['/og-image.png'],
    creator: '@tutorplan', // Update this with your actual Twitter handle if you have one
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
        <Analytics/>
      </body>
    </html>
  );
}
