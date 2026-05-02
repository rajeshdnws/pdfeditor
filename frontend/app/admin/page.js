'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import api from '@/lib/api';

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, usersRes, pdfsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/pdfs'),
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users || []);
      setPdfs(pdfsRes.data.pdfs || []);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        await fetchAdminData();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleDeletePDF = async (id) => {
    if (confirm('Are you sure you want to delete this PDF?')) {
      try {
        await api.delete(`/admin/pdfs/${id}`);
        await fetchAdminData();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {['stats', 'users', 'pdfs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-600 font-bold">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-600 font-bold">Total PDFs</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalPDFs}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-600 font-bold">Admins</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.adminCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-600 font-bold">Regular Users</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.userCount}</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PDFs Tab */}
        {activeTab === 'pdfs' && (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Filename</th>
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Size</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((pdf) => (
                  <tr key={pdf.id} className="border-t">
                    <td className="px-4 py-2">{pdf.filename}</td>
                    <td className="px-4 py-2">{pdf.userId}</td>
                    <td className="px-4 py-2">{(pdf.size / 1024).toFixed(2)} KB</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeletePDF(pdf.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
