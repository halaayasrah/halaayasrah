import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Upload, FolderOpen, User, ShieldCheck,
  BarChart2, BarChart3, Settings, LogOut
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: Upload, label: 'Upload Files' },
  { to: '/files', icon: FolderOpen, label: 'My Files' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/quiz', icon: ShieldCheck, label: 'Awareness Quiz' },
  { to: '/results', icon: BarChart2, label: 'My Results' },
  { to: '/statistics', icon: BarChart3, label: 'Statistics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-60 flex flex-col bg-[#130b0e] border-r border-[rgba(232,93,117,0.1)] py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #e85d75, #c94060)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
              fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="11" r="2.5" fill="white" />
            <path d="M12 13.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-sm tracking-widest">ZERO-VAULT</p>
          <p className="text-[#e85d75] text-[9px] tracking-widest font-medium">SECURITY PLATFORM</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-3 px-4 py-3 text-sm font-medium ${isActive ? 'active text-[#e85d75]' : 'text-gray-400'}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={() => navigate('/dashboard')}
        className="sidebar-link flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 mt-4 w-full border border-[rgba(232,93,117,0.15)] rounded-xl"
      >
        <LogOut size={18} />
        Log Out
      </button>
    </aside>
  )
}
