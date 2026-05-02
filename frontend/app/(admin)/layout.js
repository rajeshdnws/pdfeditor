'use client';

import { AuthProvider } from '@/lib/AuthContext';
import AdminNavbar from '@/components/AdminNavbar';
import { AdminProtectedRoute } from '@/components/RouteProtection';
import '@/styles/globals.css';

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminNavbar />
      <AdminProtectedRoute>
        <main className="container mx-auto py-8">
          {children}
        </main>
      </AdminProtectedRoute>
    </AuthProvider>
  );
}
