'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';
import api from '@/lib/api';

export default function CustomerDashboard() {
  const { user } = useContext(AuthContext);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState({ total: 0, totalSize: 0 });

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await api.get('/pdf/list');
      const pdfList = response.data.pdfs || [];
      setPdfs(pdfList);
      
      // Calculate stats
      const total = pdfList.length;
      const totalSize = pdfList.reduce((sum, pdf) => sum + (pdf.size || 0), 0);
      setStats({ total, totalSize });
    } catch (error) {
      console.error('Failed to fetch PDFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/pdf/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      await fetchPDFs();
      alert('PDF uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this PDF?')) {
      try {
        await api.delete(`/pdf/${id}`);
        await fetchPDFs();
        alert('PDF deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Delete failed. Please try again.');
      }
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await api.post(`/pdf/${id}/download`, {}, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}! 👋</h1>
        <p className="text-blue-100">Manage your PDF files and edit them online</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 font-bold text-sm">Total Files</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-600 font-bold text-sm">Total Storage Used</h3>
          <p className="text-3xl font-bold text-green-600">
            {(stats.totalSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-2 border-dashed border-blue-300">
        <h2 className="text-2xl font-bold mb-6">📤 Upload New PDF</h2>
        <form onSubmit={handleUpload} className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full border-2 border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={uploading || !file}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-bold transition"
          >
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </form>
      </div>

      {/* PDFs List Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">📄 Your PDF Files</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : pdfs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No PDFs uploaded yet.</p>
            <p className="text-gray-400 text-sm">Start by uploading your first PDF above!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-gray-700">File Name</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-700">Size</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-700">Uploaded Date</th>
                  <th className="px-6 py-3 text-left font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pdfs.map((pdf) => (
                  <tr key={pdf.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📄</span>
                        <span className="font-medium text-gray-900">{pdf.filename}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {(pdf.size / 1024).toFixed(2)} KB
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(pdf.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleDownload(pdf.id, pdf.filename)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium transition"
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => handleDelete(pdf.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium transition"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
