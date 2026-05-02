'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          PDF Editor
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.name}</span>
              {user.role === 'admin' && (
                <Link href="/admin" className="hover:underline">
                  Admin Panel
                </Link>
              )}
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
