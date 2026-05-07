import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'

const particles = [
  { top: '20%', left: '30%', delay: '0s' },
  { top: '15%', left: '65%', delay: '0.5s' },
  { top: '35%', left: '20%', delay: '1s' },
  { top: '25%', right: '20%', delay: '1.5s' },
  { top: '60%', left: '25%', delay: '0.8s' },
  { top: '55%', right: '25%', delay: '1.2s' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-full min-h-[80vh] relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,93,117,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Star particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="star-particle"
          style={{ ...p, animationDelay: p.delay }}
        />
      ))}

      <div className="flex flex-col items-center gap-8 relative z-10 text-center max-w-lg">
        {/* Shield icon */}
        <div className="relative flex items-center justify-center w-48 h-48">
          {/* Ellipse ring under shield */}
          <div
            className="ring-glow absolute bottom-4 left-1/2"
            style={{
              width: '130px',
              height: '20px',
              background: 'radial-gradient(ellipse, rgba(232,93,117,0.5) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translateX(-50%)',
              filter: 'blur(4px)',
            }}
          />
          <svg
            className="glow-shield"
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
          >
            <path
              d="M60 4L8 26v44c0 38 21.5 70 52 82 30.5-12 52-44 52-82V26L60 4z"
              fill="url(#shieldGrad)"
              stroke="rgba(232,93,117,0.6)"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="shieldGrad" x1="60" y1="4" x2="60" y2="152" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(232,93,117,0.4)" />
                <stop offset="100%" stopColor="rgba(200,60,90,0.15)" />
              </linearGradient>
            </defs>
            {/* Keyhole */}
            <circle cx="60" cy="60" r="12" fill="none" stroke="rgba(232,93,117,0.9)" strokeWidth="2.5" />
            <path d="M55 60h10M60 68v14" stroke="rgba(232,93,117,0.9)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to{' '}
            <span style={{ color: '#e85d75' }}>Zero-Vault</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Zero-Vault helps you protect what matters most.<br />
            Learn, stay aware, and build strong security habits<br />
            through our quick awareness quiz.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => navigate('/quiz')}
            className="btn-gradient flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-semibold text-lg shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 7c5.5-5 12.5-5 18 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 10c4-3.5 10-3.5 14 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="3" fill="white" />
            </svg>
            Take Awareness Quiz
          </button>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Clock size={14} />
            It only takes 2 minutes
          </p>
        </div>
      </div>
    </div>
  )
}
