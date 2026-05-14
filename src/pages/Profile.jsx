import { useState, useEffect } from 'react'
import { User, Mail, Shield, Edit3, Save, Loader } from 'lucide-react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
  })

  useEffect(() => {
    api.me()
      .then(r => r.json())
      .then(data => {
        if (data.id) {
          setForm({
            full_name: data.full_name || '',
            username: data.username || '',
            email: data.email || '',
            bio: data.bio || '',
          })
          updateUser(data)
        }
      })
      .catch(() => {})
  }, [])

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSave() {
    setSaving(true)
    setMsg('')
    try {
      const res = await api.updateProfile({
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        bio: form.bio,
      })
      const data = await res.json()
      if (res.ok) {
        updateUser(form)
        setMsg('Profile updated successfully!')
        setEditing(false)
      } else {
        setMsg(data.detail || 'Update failed')
      }
    } catch {
      setMsg('Connection error')
    } finally {
      setSaving(false)
    }
  }

  const initials = (form.full_name || form.username || 'U')[0].toUpperCase()

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Profile</h2>

      {/* Avatar card */}
      <div className="card p-6 flex items-center gap-6 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e85d75] to-[#c94060] flex items-center justify-center text-white text-3xl font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{form.full_name || form.username}</h3>
          <p className="text-[#e85d75] text-sm font-medium">{user?.user_type || 'User'}</p>
          {form.bio && <p className="text-gray-400 text-sm mt-1">{form.bio}</p>}
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(232,93,117,0.3)] text-[#e85d75] text-sm font-medium hover:bg-[rgba(232,93,117,0.1)] transition-colors disabled:opacity-60"
        >
          {saving ? <Loader size={15} className="animate-spin" /> : editing ? <Save size={15} /> : <Edit3 size={15} />}
          {saving ? 'Saving...' : editing ? 'Save' : 'Edit'}
        </button>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${
          msg.includes('success')
            ? 'text-green-400 bg-green-400/10 border border-green-400/20'
            : 'text-red-400 bg-red-400/10 border border-red-400/20'
        }`}>
          {msg}
        </div>
      )}

      {/* Info */}
      <div className="card p-6 space-y-5">
        <h4 className="text-white font-semibold text-sm uppercase tracking-wider text-[#e85d75]">Personal Information</h4>
        {[
          { icon: User, label: 'Full Name', key: 'full_name' },
          { icon: User, label: 'Username', key: 'username' },
          { icon: Mail, label: 'Email Address', key: 'email' },
          { icon: Shield, label: 'Bio', key: 'bio' },
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
                <p className="text-white text-sm font-medium">{form[key] || '—'}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
