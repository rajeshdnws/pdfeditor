'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';

export default function AdminNavbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/admin" className="text-2xl font-bold">
          ⚙️ Admin Panel
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm bg-purple-800 px-3 py-1 rounded">
              👑 {user?.name} (Admin)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hover:underline text-sm px-2"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="hover:underline text-sm px-2"
            >
              Users
            </Link>
            <Link
              href="/admin/pdfs"
              className="hover:underline text-sm px-2"
            >
              PDFs
            </Link>
            <Link
              href="/admin/settings"
              className="hover:underline text-sm px-2"
            >
              Settings
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
