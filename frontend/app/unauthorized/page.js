'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';

export default function Unauthorized() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-red-600 mb-4">403</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>

        {user && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600">
              Logged in as: <span className="font-bold">{user.name}</span> ({user.role})
            </p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            {user 
              ? "If you believe this is an error, please contact the administrator."
              : "Please log in to continue."}
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block font-bold transition"
            >
              Go Home
            </Link>
            {user && (
              <Link
                href={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 inline-block font-bold transition"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
