import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '', email: '', password: '', full_name: '', bio: '', user_type: 'individual',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.signup(form)
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || 'Signup failed')
        return
      }
      navigate('/login')
    } catch {
      setError('Connection error. Make sure the backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8" style={{ background: '#0e0810' }}>
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #e85d75, #c94060)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
                fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2.5" fill="white" />
              <path d="M12 13.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest">ZERO-VAULT</h1>
          <p className="text-gray-500 text-sm mt-1">Create your secure account</p>
        </div>

        <div className="card p-8">
          <h2 className="text-white font-bold text-xl mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Full Name</label>
              <input value={form.full_name} onChange={set('full_name')} required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="Your full name" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Username</label>
              <input value={form.username} onChange={set('username')} required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="Choose a username" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Email</label>
              <input type="email" value={form.email} onChange={set('email')} required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={set('password')} required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="Strong password" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Account Type</label>
              <select value={form.user_type} onChange={set('user_type')}
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75]">
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              className="btn-gradient w-full py-3 rounded-xl text-white font-semibold text-sm mt-2 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e85d75] hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
