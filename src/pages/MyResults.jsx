import { useState, useEffect } from 'react'
import { Trophy, TrendingUp, Target, Calendar } from 'lucide-react'
import { api } from '../api'

const gradeColor = {
  'A+': 'text-green-400',
  A: 'text-[#e85d75]',
  B: 'text-blue-400',
  C: 'text-yellow-400',
  D: 'text-red-400',
}

export default function MyResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getResults()
      .then(setResults)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-4">
        <h2 className="text-2xl font-bold text-white mb-6">My Results</h2>
        <div className="card p-12 text-center text-gray-500">Loading results...</div>
      </div>
    )
  }

  const avg = results.length
    ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length)
    : 0
  const best = results.length ? Math.max(...results.map((r) => r.score)) : 0

  return (
    <div className="max-w-2xl mx-auto py-4">
      <h2 className="text-2xl font-bold text-white mb-6">My Results</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Trophy, label: 'Quizzes Taken', value: results.length, color: '#e85d75' },
          { icon: TrendingUp, label: 'Average Score', value: `${avg}%`, color: '#f4a347' },
          { icon: Target, label: 'Best Score', value: `${best}%`, color: '#4ade80' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${color}1a` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-white font-semibold text-sm">Overall Performance</p>
          <p className="text-[#e85d75] font-bold">{avg}%</p>
        </div>
        <div className="w-full bg-[#2a1820] rounded-full h-3">
          <div className="progress-bar h-3 rounded-full" style={{ width: `${avg}%` }} />
        </div>
        <p className="text-gray-500 text-xs mt-2">Keep improving to reach 90%+ security awareness</p>
      </div>

      <h3 className="text-white font-semibold mb-4">Quiz History</h3>
      {results.length === 0 ? (
        <div className="card p-10 text-center text-gray-500">No quiz results yet. Take a quiz to get started!</div>
      ) : (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={r.id || i} className="card p-5 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(232,93,117,0.1)' }}
              >
                <span className={`text-xl font-black ${gradeColor[r.grade] || 'text-white'}`}>
                  {r.grade}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{r.topic}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 bg-[#2a1820] rounded-full h-1.5">
                    <div className="progress-bar h-1.5 rounded-full" style={{ width: `${r.score}%` }} />
                  </div>
                  <span className="text-[#e85d75] text-xs font-bold">{r.score}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Calendar size={11} />
                  {r.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
