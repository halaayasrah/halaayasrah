import { useState } from 'react'
import { Bell, Shield, Moon, Globe, Lock, Eye, EyeOff } from 'lucide-react'

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
  const [pass, setPass] = useState('')

  const toggle = (k) => setSettings(prev => ({ ...prev, [k]: !prev[k] }))

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive security alerts via email' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
        { key: 'threatAlerts', label: 'Threat Alerts', desc: 'Immediate alerts for detected threats' },
        { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of your security activity' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of account security' },
        { key: 'autoScan', label: 'Auto-Scan Uploads', desc: 'Automatically scan files on upload' },
      ],
    },
    {
      title: 'Appearance',
      icon: Moon,
      items: [
        { key: 'darkMode', label: 'Dark Mode', desc: 'Use dark theme (recommended)' },
      ],
    },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      <div className="space-y-6">
        {sections.map(({ title, icon: Icon, items }) => (
          <div key={title} className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(232,93,117,0.1)' }}>
                <Icon size={18} className="text-[#e85d75]" />
              </div>
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
            <div className="space-y-5">
              {items.map(({ key, label, desc }) => (
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
        ))}

        {/* Language */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Globe size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Language & Region</h3>
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(232,93,117,0.1)' }}>
              <Lock size={18} className="text-[#e85d75]" />
            </div>
            <h3 className="text-white font-semibold">Change Password</h3>
          </div>
          <div className="space-y-3">
            {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
              <div key={i} className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder={label}
                  className="w-full bg-[#2a1820] text-white text-sm px-4 py-3 rounded-xl border border-[rgba(232,93,117,0.15)] outline-none focus:border-[#e85d75] placeholder-gray-600 pr-12"
                />
                {i === 1 && (
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#e85d75]"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
            ))}
            <button className="btn-gradient w-full py-3 rounded-xl text-white font-semibold text-sm mt-2">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
