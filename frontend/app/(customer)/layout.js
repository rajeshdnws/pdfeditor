'use client';

import { AuthProvider } from '@/lib/AuthContext';
import CustomerNavbar from '@/components/CustomerNavbar';
import { CustomerProtectedRoute } from '@/components/RouteProtection';
import '@/styles/globals.css';

export default function CustomerLayout({ children }) {
  return (
    <AuthProvider>
      <CustomerNavbar />
      <CustomerProtectedRoute>
        <main className="container mx-auto py-8">
          {children}
        </main>
      </CustomerProtectedRoute>
    </AuthProvider>
  );
}
