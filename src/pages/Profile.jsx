import { useState } from 'react'
import { User, Mail, Phone, Shield, Edit3, Save } from 'lucide-react'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: 'Hala Yasrah',
    email: 'hala.yasrah@email.com',
    phone: '+966 55 123 4567',
    role: 'Security Analyst',
    department: 'IT Security',
    joined: 'January 2024',
  })

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>

      {/* Avatar card */}
      <div className="card p-6 flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e85d75] to-[#c94060] flex items-center justify-center text-white text-3xl font-bold shrink-0">
          H
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{form.name}</h3>
          <p className="text-[#e85d75] text-sm font-medium">{form.role}</p>
          <p className="text-gray-400 text-sm">{form.department}</p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(232,93,117,0.3)] text-[#e85d75] text-sm font-medium hover:bg-[rgba(232,93,117,0.1)] transition-colors"
        >
          {editing ? <Save size={15} /> : <Edit3 size={15} />}
          {editing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Info */}
      <div className="card p-6 space-y-5">
        <h4 className="text-white font-semibold text-sm uppercase tracking-wider text-[#e85d75]">Personal Information</h4>

        {[
          { icon: User, label: 'Full Name', key: 'name' },
          { icon: Mail, label: 'Email Address', key: 'email' },
          { icon: Phone, label: 'Phone Number', key: 'phone' },
          { icon: Shield, label: 'Role', key: 'role' },
        ].map(({ icon: Icon, label, key }) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Icon size={18} className="text-[#e85d75]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              {editing ? (
                <input
                  value={form[key]}
                  onChange={set(key)}
                  className="bg-[#2a1820] text-white text-sm px-3 py-1.5 rounded-lg border border-[rgba(232,93,117,0.2)] outline-none focus:border-[#e85d75] w-full"
                />
              ) : (
                <p className="text-white text-sm font-medium">{form[key]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Quizzes Taken', value: '12' },
          { label: 'Files Scanned', value: '48' },
          { label: 'Security Score', value: '87%' },
        ].map(({ label, value }) => (
          <div key={label} className="card p-5 text-center">
            <p className="text-2xl font-bold text-[#e85d75]">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
