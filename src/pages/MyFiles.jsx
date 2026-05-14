import { useState, useEffect } from 'react'
import { FolderOpen, File, Image, FileText, Search, Trash2, Download } from 'lucide-react'
import { api } from '../api'

const iconFor = (type) => {
  if (type === 'image') return <Image size={18} className="text-[#e85d75]" />
  if (type === 'text') return <FileText size={18} className="text-[#e85d75]" />
  return <File size={18} className="text-[#e85d75]" />
}

const statusColor = {
  Clean: 'text-green-400 bg-green-400/10',
  Threat: 'text-red-400 bg-red-400/10',
  Warning: 'text-yellow-400 bg-yellow-400/10',
}

export default function MyFiles() {
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getFiles()
      .then(setFiles)
      .catch(() => setError('Failed to load files'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await api.deleteFile(id)
      setFiles((prev) => prev.filter((f) => f.id !== id))
    } catch {
      alert('Failed to delete file')
    }
  }

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Files</h2>
          <p className="text-gray-400">Manage and review your uploaded files</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(232,93,117,0.2)] bg-[#1f1215]">
          <Search size={16} className="text-gray-400" />
          <input
            className="bg-transparent text-white text-sm outline-none placeholder-gray-500 w-40"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="card p-12 text-center text-gray-500">Loading files...</div>
      )}

      {error && (
        <div className="card p-6 text-center text-red-400">{error}</div>
      )}

      {!loading && !error && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(232,93,117,0.1)]">
                <th className="text-left text-gray-400 text-xs font-medium px-5 py-3">Name</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Size</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Date</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-12">
                    <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
                    No files found
                  </td>
                </tr>
              )}
              {filtered.map((f, i) => (
                <tr
                  key={f.id}
                  className={`${
                    i < filtered.length - 1
                      ? 'border-b border-[rgba(232,93,117,0.06)]'
                      : ''
                  } hover:bg-[rgba(232,93,117,0.04)] transition-colors`}
                >
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(232,93,117,0.08)]">
                      {iconFor(f.type)}
                    </div>
                    <span className="text-white text-sm font-medium">{f.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{f.size}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{f.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusColor[f.status] || 'text-gray-400 bg-gray-400/10'
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <a
                        href={api.downloadUrl(f.id)}
                        download={f.name}
                        className="text-gray-500 hover:text-[#e85d75] transition-colors p-1"
                      >
                        <Download size={15} />
                      </a>
                      <button
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        onClick={() => handleDelete(f.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
