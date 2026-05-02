'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (user) => {
    setEditingId(user.id);
    setEditingRole(user.role);
  };

  const handleSaveRole = async (id) => {
    try {
      await api.put(`/admin/users/${id}`, { role: editingRole });
      await fetchUsers();
      setEditingId(null);
      alert('User role updated successfully');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update user role');
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete user "${name}"?`)) {
      try {
        await api.delete(`/admin/users/${id}`);
        await fetchUsers();
        alert('User deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete user');
      }
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
      <h1 className="text-4xl font-bold mb-8">👥 User Management</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Name</th>
                <th className="px-6 py-4 text-left font-bold">Email</th>
                <th className="px-6 py-4 text-left font-bold">Role</th>
                <th className="px-6 py-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">👤</span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      {editingId === user.id ? (
                        <select
                          value={editingRole}
                          onChange={(e) => setEditingRole(e.target.value)}
                          className="border-2 border-purple-500 rounded px-3 py-1"
                        >
                          <option value="user">👤 User</option>
                          <option value="admin">👑 Admin</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded font-bold ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {editingId === user.id ? (
                        <>
                          <button
                            onClick={() => handleSaveRole(user.id)}
                            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditRole(user)}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm font-medium"
                          >
                            Edit Role
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
