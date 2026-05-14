import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react'
import { api } from '../api'

export default function Statistics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getStatistics()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return (
      <div className="max-w-3xl mx-auto py-4">
        <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>
        <div className="card p-12 text-center text-gray-500">Loading statistics...</div>
      </div>
    )
  }

  const { kpis, monthly, threatBreakdown } = data
  const maxBar = Math.max(...monthly.map((m) => m.threats + m.clean))

  const kpiCards = [
    { icon: Shield, label: 'Total Scans', value: kpis.totalScans, change: '+12%', color: '#e85d75' },
    { icon: AlertTriangle, label: 'Threats Found', value: kpis.threatsFound, change: '+3%', color: '#f59e0b' },
    { icon: CheckCircle, label: 'Files Safe', value: kpis.filesSafe, change: '+18%', color: '#4ade80' },
    { icon: Activity, label: 'Scan Rate', value: `${kpis.scanRate}%`, change: '+0.5%', color: '#60a5fa' },
  ]

  return (
    <div className="max-w-3xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiCards.map(({ icon: Icon, label, value, change, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${color}1a` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <span className="text-green-400 text-xs font-medium">{change}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6 mb-6">
        <h3 className="text-white font-semibold mb-6">Monthly Activity</h3>
        <div className="flex items-end gap-6 h-40">
          {monthly.map((m) => {
            const total = m.threats + m.clean
            const heightPct = (total / maxBar) * 100
            const threatPct = (m.threats / total) * 100
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full flex flex-col justify-end rounded-t-lg overflow-hidden"
                  style={{ height: `${heightPct}%`, minHeight: '20px' }}
                >
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

      <div className="card p-6">
        <h3 className="text-white font-semibold mb-6">Threat Breakdown</h3>
        <div className="space-y-5">
          {threatBreakdown.map((t) => (
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
