import { Bell } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="flex items-center justify-end gap-4 px-6 py-4 border-b border-[rgba(232,93,117,0.08)] bg-[#0f0a0b]">
      {/* Bell */}
      <div className="relative cursor-pointer">
        <Bell size={22} className="text-gray-400 hover:text-[#e85d75] transition-colors" />
        <span className="badge-notification">3</span>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[rgba(232,93,117,0.3)]">
          <div className="w-full h-full bg-gradient-to-br from-[#e85d75] to-[#c94060] flex items-center justify-center text-white text-sm font-bold">
            H
          </div>
        </div>
        <span className="text-white font-medium text-sm">Hala Y.</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </header>
  )
}
