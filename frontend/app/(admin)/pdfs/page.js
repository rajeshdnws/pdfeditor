'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export default function AdminPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await api.get('/admin/pdfs');
      setPdfs(response.data.pdfs || []);
    } catch (error) {
      console.error('Failed to fetch PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, filename) => {
    if (confirm(`Are you sure you want to delete PDF "${filename}"?`)) {
      try {
        await api.delete(`/admin/pdfs/${id}`);
        await fetchPDFs();
        alert('PDF deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete PDF');
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

  const totalSize = pdfs.reduce((sum, pdf) => sum + (pdf.size || 0), 0);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">📄 PDF Management</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 font-bold text-sm">Total PDFs</h3>
          <p className="text-4xl font-bold text-blue-600">{pdfs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-600 font-bold text-sm">Total Storage</h3>
          <p className="text-4xl font-bold text-green-600">{(totalSize / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
          <h3 className="text-gray-600 font-bold text-sm">Average Size</h3>
          <p className="text-4xl font-bold text-orange-600">
            {pdfs.length > 0 ? (totalSize / pdfs.length / 1024).toFixed(2) : 0} KB
          </p>
        </div>
      </div>

      {/* PDFs Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Filename</th>
                <th className="px-6 py-4 text-left font-bold">User ID</th>
                <th className="px-6 py-4 text-left font-bold">Size</th>
                <th className="px-6 py-4 text-left font-bold">Uploaded</th>
                <th className="px-6 py-4 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pdfs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No PDFs found
                  </td>
                </tr>
              ) : (
                pdfs.map((pdf) => (
                  <tr key={pdf.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📄</span>
                        <span className="font-medium truncate">{pdf.filename}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                      {pdf.userId}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {(pdf.size / 1024).toFixed(2)} KB
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(pdf.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(pdf.id, pdf.filename)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm font-medium"
                      >
                        🗑️ Delete
                      </button>
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
