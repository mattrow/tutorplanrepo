"use client";

import { AuthProvider } from "@/hooks/useAuth";
import PageViewTracker from "@/components/PageViewTracker";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PageViewTracker />
      {children}
    </AuthProvider>
  );
}
