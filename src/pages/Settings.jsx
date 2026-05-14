import { useState } from 'react'
import { Bell, Shield, Moon, Globe, Lock, Eye, EyeOff, Loader, Copy } from 'lucide-react'
import { api } from '../api'

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-[#e85d75]' : 'bg-[#2a1820]'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    threatAlerts: true,
    weeklyReport: true,
    darkMode: true,
    twoFactor: false,
    autoScan: true,
    language: 'English',
  })
  const [showPass, setShowPass] = useState(false)
  const [passwords, setPasswords] = useState({ old: '', new_: '', confirm: '' })
  const [passMsg, setPassMsg] = useState('')
  const [passLoading, setPassLoading] = useState(false)
  const [mfaData, setMfaData] = useState(null)
  const [mfaLoading, setMfaLoading] = useState(false)

  const toggle = (k) => setSettings(prev => ({ ...prev, [k]: !prev[k] }))

  async function handleTwoFactorToggle() {
    if (settings.twoFactor) {
      toggle('twoFactor')
      setMfaData(null)
      return
    }
    setMfaLoading(true)
    try {
      const res = await api.enableMfa()
      const data = await res.json()
      if (res.ok) {
        setMfaData(data)
        setSettings(prev => ({ ...prev, twoFactor: true }))
      }
    } catch {}
    setMfaLoading(false)
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    if (passwords.new_ !== passwords.confirm) {
      setPassMsg('New passwords do not match')
      return
    }
    setPassLoading(true)
    setPassMsg('')
    try {
      const res = await api.changePassword(passwords.old, passwords.new_)
      const data = await res.json()
      setPassMsg(res.ok ? 'Password updated successfully!' : (data.detail || 'Failed to update password'))
      if (res.ok) setPasswords({ old: '', new_: '', confirm: '' })
    } catch {
      setPassMsg('Connection error')
    } finally {
      setPassLoading(false)
    }
  }

  const notificationSection = {
    title: 'Notifications',
    icon: Bell,
    items: [
      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive security alerts via email' },
      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
      { key: 'threatAlerts', label: 'Threat Alerts', desc: 'Immediate alerts for detected threats' },
      { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of your security activity' },
    ],
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
      <div className="space-y-6">

        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Bell size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Notifications</h3>
          </div>
          <div className="space-y-5">
            {notificationSection.items.map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
                <Toggle value={settings[key]} onChange={() => toggle(key)} />
              </div>
            ))}
          </div>
        </div>

        {/* Security - 2FA */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Shield size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Security</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-gray-500 text-xs mt-0.5">Add an extra layer of account security</p>
            </div>
            {mfaLoading
              ? <Loader size={20} className="animate-spin text-[#e85d75]" />
              : <Toggle value={settings.twoFactor} onChange={handleTwoFactorToggle} />
            }
          </div>
          {mfaData && (
            <div className="mt-4 p-4 rounded-xl bg-[#2a1820] border border-[rgba(232,93,117,0.2)]">
              <p className="text-[#e85d75] text-sm font-medium mb-2">Scan this key in Google Authenticator:</p>
              <div className="flex items-center gap-2">
                <code className="text-gray-300 text-xs bg-black/30 px-3 py-2 rounded-lg flex-1 break-all">
                  {mfaData.secret_key}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(mfaData.secret_key)}
                  className="text-gray-400 hover:text-[#e85d75] transition-colors"
                  title="Copy secret key"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mt-5">
            <div>
              <p className="text-white text-sm font-medium">Auto-Scan Uploads</p>
              <p className="text-gray-500 text-xs mt-0.5">Automatically scan files on upload</p>
            </div>
            <Toggle value={settings.autoScan} onChange={() => toggle('autoScan')} />
          </div>
        </div>

        {/* Appearance */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Moon size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Dark Mode</p>
              <p className="text-gray-500 text-xs mt-0.5">Use dark theme (recommended)</p>
            </div>
            <Toggle value={settings.darkMode} onChange={() => toggle('darkMode')} />
          </div>
        </div>

        {/* Language */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Globe size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Language &amp; Region</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Interface Language</p>
              <p className="text-gray-500 text-xs mt-0.5">Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={e => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="bg-[#2a1820] text-white text-sm px-3 py-2 rounded-lg border border-[rgba(232,93,117,0.2)] outline-none focus:border-[#e85d75]"
            >
              <option>English</option>
              <option>Arabic</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        {/* Change Password */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Lock size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Change Password</h3>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Current Password"
              value={passwords.old}
              onChange={e => setPasswords(p => ({ ...p, old: e.target.value }))}
              className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
            />
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="New Password"
                value={passwords.new_}
                onChange={e => setPasswords(p => ({ ...p, new_: e.target.value }))}
                className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#e85d75]"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
              className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600"
            />
            {passMsg && (
              <div className={`text-sm px-4 py-3 rounded-xl ${
                passMsg.includes('success')
                  ? 'text-green-400 bg-green-400/10 border border-green-400/20'
                  : 'text-red-400 bg-red-400/10 border border-red-400/20'
              }`}>
                {passMsg}
              </div>
            )}
            <button
              type="submit"
              disabled={passLoading}
              className="btn-gradient w-full py-3 rounded-xl text-white font-semibold text-sm mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {passLoading ? <><Loader size={14} className="animate-spin" /> Updating...</> : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
