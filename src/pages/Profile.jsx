import { useState, useEffect } from 'react'
import { User, Mail, Phone, Shield, Edit3, Save } from 'lucide-react'
import { api } from '../api'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.getProfile().then(setForm).catch(console.error)
  }, [])

  const set = (k) => (e) => setForm((prev) => ({ ...prev, [k]: e.target.value }))

  const handleSave = async () => {
    if (!editing) { setEditing(true); return }
    try {
      const updated = await api.updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
      })
      setForm(updated)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      alert('Failed to save profile')
    }
  }

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>
        <div className="card p-12 text-center text-gray-500">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>

      <div className="card p-6 flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e85d75] to-[#c94060] flex items-center justify-center text-white text-3xl font-bold shrink-0">
          {form.name ? form.name[0].toUpperCase() : 'U'}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{form.name}</h3>
          <p className="text-[#e85d75] text-sm font-medium">{form.role}</p>
          <p className="text-gray-400 text-sm">{form.department}</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(232,93,117,0.3)] text-[#e85d75] text-sm font-medium hover:bg-[rgba(232,93,117,0.1)] transition-colors"
        >
          {editing ? <Save size={15} /> : <Edit3 size={15} />}
          {saved ? 'Saved!' : editing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="card p-6 space-y-5">
        <h4 className="text-white font-semibold text-sm uppercase tracking-wider text-[#e85d75]">
          Personal Information
        </h4>
        {[
          { icon: User, label: 'Full Name', key: 'name' },
          { icon: Mail, label: 'Email Address', key: 'email' },
          { icon: Phone, label: 'Phone Number', key: 'phone' },
          { icon: Shield, label: 'Role', key: 'role' },
        ].map(({ icon: Icon, label, key }) => (
          <div key={key} className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(232,93,117,0.1)' }}
            >
              <Icon size={18} className="text-[#e85d75]" />
            </div>
            <div className="flex-1">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              {editing ? (
                <input
                  value={form[key] || ''}
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

      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Quizzes Taken', value: '—' },
          { label: 'Files Scanned', value: '—' },
          { label: 'Security Score', value: '—' },
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
