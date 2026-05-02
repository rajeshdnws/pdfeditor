'use client';

export default function AdminSettings() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">⚙️ System Settings</h1>

      {/* Server Configuration */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Server Configuration</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">API URL</label>
              <input
                type="text"
                value="http://localhost:5000/api"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Frontend URL</label>
              <input
                type="text"
                value="http://localhost:3000"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Settings */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Upload Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Max File Size</label>
            <input
              type="text"
              value="50 MB"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Supported Formats</label>
            <input
              type="text"
              value=".pdf"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Storage Path</label>
            <input
              type="text"
              value="/backend/uploads"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Database Settings */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">Database Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Database Type</label>
            <input
              type="text"
              value="MySQL 8.0"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">ORM</label>
            <input
              type="text"
              value="Prisma"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-6">🔒 Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h3 className="font-bold text-gray-900">HTTPS</h3>
              <p className="text-sm text-gray-600">Secure connection encryption</p>
            </div>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded font-bold text-sm">
              Not Configured
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h3 className="font-bold text-gray-900">JWT Authentication</h3>
              <p className="text-sm text-gray-600">API token-based authentication</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded font-bold text-sm">
              Enabled
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <h3 className="font-bold text-gray-900">CORS</h3>
              <p className="text-sm text-gray-600">Cross-Origin Resource Sharing</p>
            </div>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded font-bold text-sm">
              Configured
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <h3 className="font-bold text-gray-900">Rate Limiting</h3>
              <p className="text-sm text-gray-600">API request throttling</p>
            </div>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded font-bold text-sm">
              Not Configured
            </span>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">ℹ️ System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Backend Version</p>
            <p className="text-2xl font-bold text-gray-900">1.0.0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Frontend Version</p>
            <p className="text-2xl font-bold text-gray-900">1.0.0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Node Version</p>
            <p className="text-2xl font-bold text-gray-900">18.x</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">React Version</p>
            <p className="text-2xl font-bold text-gray-900">18.2.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
