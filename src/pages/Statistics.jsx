import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

const THREAT_DATA = [
  { label: 'Phishing Attempts', value: 34, max: 50, color: '#e85d75' },
  { label: 'Malware Detected', value: 12, max: 50, color: '#f4a347' },
  { label: 'Suspicious Files', value: 8, max: 50, color: '#f59e0b' },
  { label: 'Clean Files', value: 156, max: 200, color: '#4ade80' },
]

const MONTHLY = [
  { month: 'Sep', threats: 8, clean: 24 },
  { month: 'Oct', threats: 14, clean: 31 },
  { month: 'Nov', threats: 6, clean: 28 },
  { month: 'Dec', threats: 19, clean: 35 },
  { month: 'Jan', threats: 11, clean: 38 },
]

const maxBar = Math.max(...MONTHLY.map(m => m.threats + m.clean))

export default function Statistics() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Shield, label: 'Total Scans', value: '210', change: '+12%', color: '#e85d75' },
          { icon: AlertTriangle, label: 'Threats Found', value: '54', change: '+3%', color: '#f59e0b' },
          { icon: CheckCircle, label: 'Files Safe', value: '156', change: '+18%', color: '#4ade80' },
          { icon: Activity, label: 'Scan Rate', value: '98.5%', change: '+0.5%', color: '#60a5fa' },
        ].map(({ icon: Icon, label, value, change, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${color}1a` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-green-400 text-xs font-medium">{change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="card p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Monthly Activity</h3>
        <div className="flex items-end gap-6 h-40">
          {MONTHLY.map((m) => {
            const total = m.threats + m.clean
            const heightPct = (total / maxBar) * 100
            const threatPct = (m.threats / total) * 100
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end rounded-t-lg overflow-hidden"
                  style={{ height: `${heightPct}%`, minHeight: '20px' }}>
                  <div style={{ height: `${threatPct}%`, background: '#e85d75', minHeight: '4px' }} />
                  <div style={{ height: `${100 - threatPct}%`, background: '#4ade80', minHeight: '4px' }} />
                </div>
                <span className="text-gray-400 text-xs">{m.month}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#e85d75]" />
            <span className="text-gray-400 text-xs">Threats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#4ade80]" />
            <span className="text-gray-400 text-xs">Clean Files</span>
          </div>
        </div>
      </div>

      {/* Threat breakdown */}
      <div className="card p-6">
        <h3 className="text-white font-semibold mb-6">Threat Breakdown</h3>
        <div className="space-y-5">
          {THREAT_DATA.map((t) => (
            <div key={t.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">{t.label}</span>
                <span className="text-white text-sm font-bold">{t.value}</span>
              </div>
              <div className="w-full bg-[#2a1820] rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(t.value / t.max) * 100}%`, background: t.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
