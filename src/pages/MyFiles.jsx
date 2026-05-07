import { useState } from 'react'
import { FolderOpen, File, Image, FileText, Search, Trash2, Download } from 'lucide-react'

const MOCK_FILES = [
  { id: 1, name: 'Security_Report_2024.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15', status: 'Clean' },
  { id: 2, name: 'Profile_Photo.png', type: 'image', size: '1.1 MB', date: '2024-01-14', status: 'Clean' },
  { id: 3, name: 'Malware_Sample.exe', type: 'file', size: '340 KB', date: '2024-01-13', status: 'Threat' },
  { id: 4, name: 'Meeting_Notes.docx', type: 'doc', size: '88 KB', date: '2024-01-12', status: 'Clean' },
  { id: 5, name: 'Password_List.txt', type: 'text', size: '12 KB', date: '2024-01-11', status: 'Warning' },
  { id: 6, name: 'Company_Logo.jpg', type: 'image', size: '560 KB', date: '2024-01-10', status: 'Clean' },
]

const iconFor = (type) => {
  if (type === 'image') return <Image size={18} className="text-[#e85d75]" />
  if (type === 'text') return <FileText size={18} className="text-[#e85d75]" />
  return <File size={18} className="text-[#e85d75]" />
}

const statusColor = { Clean: 'text-green-400 bg-green-400/10', Threat: 'text-red-400 bg-red-400/10', Warning: 'text-yellow-400 bg-yellow-400/10' }

export default function MyFiles() {
  const [search, setSearch] = useState('')
  const [files, setFiles] = useState(MOCK_FILES)

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

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
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

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
              <tr key={f.id} className={`${i < filtered.length - 1 ? 'border-b border-[rgba(232,93,117,0.06)]' : ''} hover:bg-[rgba(232,93,117,0.04)] transition-colors`}>
                <td className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(232,93,117,0.08)]">
                    {iconFor(f.type)}
                  </div>
                  <span className="text-white text-sm font-medium">{f.name}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">{f.size}</td>
                <td className="px-4 py-3 text-gray-400 text-sm">{f.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[f.status]}`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="text-gray-500 hover:text-[#e85d75] transition-colors p-1">
                      <Download size={15} />
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      onClick={() => setFiles(prev => prev.filter(x => x.id !== f.id))}
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
    </div>
  )
}
