'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  // Redirect logged in users to their appropriate dashboard
  if (!loading && user) {
    if (user.role === 'admin') {
      router.push('/admin');
      return null;
    } else {
      router.push('/dashboard');
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome to PDF Editor
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Edit, merge, split, and manage your PDF files online - Just like Sejda
          </p>

          <div className="space-x-4 mb-16">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 inline-block text-lg font-bold"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 inline-block text-lg font-bold"
            >
              Already have an account?
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📁</div>
              <h2 className="text-2xl font-bold mb-4">Upload</h2>
              <p className="text-gray-600">
                Easily upload your PDF files and access them anytime from anywhere.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">✏️</div>
              <h2 className="text-2xl font-bold mb-4">Edit</h2>
              <p className="text-gray-600">
                Edit PDF content, add annotations, text, and manage your documents.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📥</div>
              <h2 className="text-2xl font-bold mb-4">Download</h2>
              <p className="text-gray-600">
                Download your edited PDFs in high quality and share them easily.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-20 bg-white p-12 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-8">Why Choose PDF Editor?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-lg">No registration required for basic use</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-lg">Completely secure and private</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-lg">Works on all devices</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-lg">Fast and reliable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
