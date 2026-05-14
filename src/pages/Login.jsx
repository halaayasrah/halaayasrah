import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.login(form.username, form.password)
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || 'Login failed')
        return
      }
      if (data.msg === '2FA_REQUIRED') {
        setError('Two-factor authentication is required. Please use the mobile authenticator app.')
        return
      }
      const meRes = await fetch('http://127.0.0.1:8000/me', {
        headers: { Authorization: `Bearer ${data.access_token}` }
      })
      const me = meRes.ok ? await meRes.json() : { username: form.username }
      login(data.access_token, me)
      navigate('/dashboard')
    } catch {
      setError('Connection error. Make sure the backend is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0e0810' }}>
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
          <p className="text-gray-500 text-sm mt-1">Security Platform</p>
        </div>

        <div className="card p-8">
          <h2 className="text-white font-bold text-xl mb-6">Welcome back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Username or Email</label>
              <input
                value={form.username}
                onChange={set('username')}
                required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                required
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-gradient w-full py-3 rounded-xl text-white font-semibold text-sm mt-2 disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-[#e85d75] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
