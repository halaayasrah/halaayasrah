import { useState, useEffect } from 'react'
import { FolderOpen, File, Image, FileText, Search, Trash2, Loader } from 'lucide-react'
import { api } from '../api'

const iconFor = (name = '') => {
  const ext = name.split('.').pop().toLowerCase()
  if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) return <Image size={18} className="text-[#e85d75]" />
  if (['txt', 'md'].includes(ext)) return <FileText size={18} className="text-[#e85d75]" />
  return <File size={18} className="text-[#e85d75]" />
}

export default function MyFiles() {
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getMyFiles()
      .then(r => r.json())
      .then(data => setFiles(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to load vault files. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(filename) {
    await api.deleteFile(filename)
    setFiles(prev => prev.filter(f => f.filename !== filename))
  }

  const filtered = files.filter(f =>
    (f.filename || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Files</h2>
          <p className="text-gray-400">Encrypted files in your Zero-Vault</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(232,93,117,0.2)] bg-[#1f1215]">
          <Search size={16} className="text-gray-400" />
          <input
            className="bg-transparent text-white text-sm outline-none placeholder-gray-500 w-40"
            placeholder="Search files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader size={20} className="animate-spin" />
            <span>Loading vault...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-12 px-6">{error}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(232,93,117,0.1)]">
                <th className="text-left text-gray-400 text-xs font-medium px-5 py-3">Name</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Type</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-12">
                    <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
                    No files in your vault yet
                  </td>
                </tr>
              )}
              {filtered.map((f, i) => (
                <tr key={f.id || i}
                  className={`${
                    i < filtered.length - 1 ? 'border-b border-[rgba(232,93,117,0.06)]' : ''
                  } hover:bg-[rgba(232,93,117,0.04)] transition-colors`}
                >
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(232,93,117,0.08)]">
                      {iconFor(f.filename)}
                    </div>
                    <span className="text-white text-sm font-medium truncate max-w-[220px]">{f.filename}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{f.file_type || 'Vault'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full text-green-400 bg-green-400/10">
                      Secured
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        onClick={() => handleDelete(f.filename)}
                        title="Move to trash"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
