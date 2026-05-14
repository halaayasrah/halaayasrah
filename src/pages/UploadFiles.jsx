import { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { api } from '../api'

const ALLOWED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export default function UploadFiles() {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  const addFiles = (incoming) => {
    const newFiles = Array.from(incoming).map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      status: ALLOWED_TYPES.includes(f.type) ? 'ready' : 'error',
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const remove = (id) => setFiles((prev) => prev.filter((f) => f.id !== id))

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleUpload = async () => {
    const readyFiles = files.filter((f) => f.status === 'ready')
    setUploading(true)
    for (const f of readyFiles) {
      const formData = new FormData()
      formData.append('file', f.file)
      try {
        await api.uploadFile(formData)
        setFiles((prev) =>
          prev.map((x) => (x.id === f.id ? { ...x, status: 'uploaded' } : x))
        )
      } catch {
        setFiles((prev) =>
          prev.map((x) => (x.id === f.id ? { ...x, status: 'error' } : x))
        )
      }
    }
    setUploading(false)
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-2">Upload Files</h2>
      <p className="text-gray-400 mb-6">Upload your files for security scanning and analysis.</p>

      <div
        className={`upload-zone flex flex-col items-center justify-center p-12 cursor-pointer text-center mb-6 ${
          dragOver ? 'drag-over' : ''
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(232,93,117,0.1)' }}
        >
          <Upload size={28} className="text-[#e85d75]" />
        </div>
        <p className="text-white font-semibold text-lg mb-1">Drop files here or click to browse</p>
        <p className="text-gray-500 text-sm">PDF, Images, Word documents, and text files up to 50MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-white font-semibold">Selected Files ({files.length})</h3>
          {files.map((f) => (
            <div key={f.id} className="card flex items-center gap-4 p-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(232,93,117,0.1)' }}
              >
                <File size={18} className="text-[#e85d75]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{f.name}</p>
                <p className="text-gray-500 text-xs">{formatSize(f.size)}</p>
              </div>
              {f.status === 'ready' && <CheckCircle size={18} className="text-green-400 shrink-0" />}
              {f.status === 'uploaded' && <CheckCircle size={18} className="text-[#e85d75] shrink-0" />}
              {f.status === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
              <button
                onClick={() => remove(f.id)}
                className="text-gray-500 hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {files.some((f) => f.status === 'ready') && (
            <button
              className="btn-gradient w-full py-3 rounded-xl text-white font-semibold mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading && <Loader size={16} className="animate-spin" />}
              {uploading
                ? 'Uploading...'
                : `Upload ${files.filter((f) => f.status === 'ready').length} File(s)`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
