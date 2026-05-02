'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard 👑</h1>
        <p className="text-purple-100">Manage users, PDFs, and system settings</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <h3 className="text-gray-600 font-bold text-sm mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-blue-600">{stats.totalUsers}</p>
            <p className="text-xs text-gray-500 mt-2">Registered accounts</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
            <h3 className="text-gray-600 font-bold text-sm mb-2">Regular Users</h3>
            <p className="text-4xl font-bold text-green-600">{stats.userCount}</p>
            <p className="text-xs text-gray-500 mt-2">Customer accounts</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
            <h3 className="text-gray-600 font-bold text-sm mb-2">Admins</h3>
            <p className="text-4xl font-bold text-purple-600">{stats.adminCount}</p>
            <p className="text-xs text-gray-500 mt-2">Administrator accounts</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h3 className="text-gray-600 font-bold text-sm mb-2">Total PDFs</h3>
            <p className="text-4xl font-bold text-orange-600">{stats.totalPDFs}</p>
            <p className="text-xs text-gray-500 mt-2">Uploaded documents</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <h3 className="text-2xl font-bold mb-2">👥 User Management</h3>
          <p className="text-gray-600 mb-4">View and manage all users</p>
          <a href="/admin/users" className="text-blue-600 font-bold hover:underline">
            Go to Users →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <h3 className="text-2xl font-bold mb-2">📄 PDF Management</h3>
          <p className="text-gray-600 mb-4">Monitor all uploaded PDFs</p>
          <a href="/admin/pdfs" className="text-blue-600 font-bold hover:underline">
            Go to PDFs →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
          <h3 className="text-2xl font-bold mb-2">⚙️ System Settings</h3>
          <p className="text-gray-600 mb-4">Configure system parameters</p>
          <a href="/admin/settings" className="text-blue-600 font-bold hover:underline">
            Go to Settings →
          </a>
        </div>
      </div>
    </div>
  );
}
