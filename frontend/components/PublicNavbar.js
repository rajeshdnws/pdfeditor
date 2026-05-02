'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';

export default function PublicNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          📄 PDF Editor
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link 
            href="/register" 
            className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-900"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
