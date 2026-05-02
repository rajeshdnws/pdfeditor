'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';

export default function CustomerNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          📄 PDF Editor - Dashboard
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm bg-blue-700 px-3 py-1 rounded">
              👤 {user?.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hover:underline text-sm px-2"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className="hover:underline text-sm px-2"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
