'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import api from '@/lib/api';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await api.get('/pdf/list');
      setPdfs(response.data.pdfs || []);
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
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this PDF?')) {
      try {
        await api.delete(`/pdf/${id}`);
        await fetchPDFs();
      } catch (error) {
        console.error('Delete failed:', error);
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
    }
  };

  return (
    <ProtectedRoute>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
          <form onSubmit={handleUpload} className="flex gap-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="flex-1 border border-gray-300 rounded-lg p-2"
              required
            />
            <button
              type="submit"
              disabled={uploading || !file}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>

        {/* PDFs List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your PDFs</h2>

          {loading ? (
            <p>Loading...</p>
          ) : pdfs.length === 0 ? (
            <p className="text-gray-500">No PDFs uploaded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Filename</th>
                    <th className="px-4 py-2 text-left">Size</th>
                    <th className="px-4 py-2 text-left">Uploaded</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfs.map((pdf) => (
                    <tr key={pdf.id} className="border-t">
                      <td className="px-4 py-2">{pdf.filename}</td>
                      <td className="px-4 py-2">{(pdf.size / 1024).toFixed(2)} KB</td>
                      <td className="px-4 py-2">
                        {new Date(pdf.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleDownload(pdf.id, pdf.filename)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => handleDelete(pdf.id)}
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
      </div>
    </ProtectedRoute>
  );
}
