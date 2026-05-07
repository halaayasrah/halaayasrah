import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'

const QUESTIONS = [
  {
    q: 'What is phishing?',
    options: [
      'A type of fishing sport',
      'A fraudulent attempt to steal sensitive information by disguising as a trustworthy entity',
      'A method to encrypt data',
      'A network protocol for secure communication',
    ],
    answer: 1,
    explanation: 'Phishing involves deceptive emails, messages, or websites that trick users into revealing passwords, credit card numbers, or other sensitive data.',
  },
  {
    q: 'Which of the following is the strongest password?',
    options: ['password123', 'P@ssw0rd', 'Tr0ub4dor&3', 'qwerty'],
    answer: 2,
    explanation: 'Strong passwords combine uppercase, lowercase, numbers, and special characters and avoid common dictionary words.',
  },
  {
    q: 'What does two-factor authentication (2FA) provide?',
    options: [
      'Faster login speed',
      'An extra layer of security requiring a second verification step',
      'Automatic password reset',
      'Unlimited login attempts',
    ],
    answer: 1,
    explanation: '2FA adds a second verification step (like an SMS code or authenticator app) beyond just a password, making accounts much harder to compromise.',
  },
  {
    q: 'What should you do if you receive a suspicious email asking you to click a link?',
    options: [
      'Click the link to see what happens',
      'Forward it to colleagues',
      'Delete it and report it to IT security',
      'Reply asking why they sent it',
    ],
    answer: 2,
    explanation: 'Never click suspicious links. Report phishing attempts to your IT security team so they can investigate and protect the organization.',
  },
  {
    q: 'What is ransomware?',
    options: [
      'Software that speeds up your computer',
      'Malicious software that encrypts your files and demands payment for the key',
      'A type of antivirus program',
      'A secure file sharing tool',
    ],
    answer: 1,
    explanation: 'Ransomware encrypts victims\' files and demands a ransom for the decryption key, causing massive disruption to individuals and organizations.',
  },
]

export default function AwarenessQuiz() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const q = QUESTIONS[current]
  const score = answers.filter(Boolean).length

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, rgba(232,93,117,0.2), rgba(232,93,117,0.05))' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z"
              fill="rgba(232,93,117,0.2)" stroke="#e85d75" strokeWidth="1.5" />
            <path d="M9 12l2 2 4-4" stroke="#e85d75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Security Awareness Quiz</h2>
        <p className="text-gray-400 max-w-md mb-8">
          Test your cybersecurity knowledge with {QUESTIONS.length} questions covering phishing, passwords, 2FA, malware, and more.
        </p>
        <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
          <span>📋 {QUESTIONS.length} Questions</span>
          <span>⏱ ~2 Minutes</span>
          <span>🎯 Multiple Choice</span>
        </div>
        <button onClick={() => setStarted(true)} className="btn-gradient px-10 py-4 rounded-2xl text-white font-semibold text-lg">
          Start Quiz
        </button>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100)
    const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Fair' : 'Needs Improvement'
    const gradeColor = pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-[#e85d75]' : pct >= 40 ? 'text-yellow-400' : 'text-red-400'

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="card p-10 max-w-md w-full">
          <div className="text-6xl font-black mb-2" style={{ color: '#e85d75' }}>{pct}%</div>
          <h3 className={`text-2xl font-bold mb-1 ${gradeColor}`}>{grade}</h3>
          <p className="text-gray-400 mb-6">You got {score} out of {QUESTIONS.length} questions correct</p>
          <div className="w-full bg-[#2a1820] rounded-full h-3 mb-8">
            <div className="progress-bar h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setStarted(false); setCurrent(0); setSelected(null); setRevealed(false); setAnswers([]); setFinished(false) }}
              className="flex-1 py-3 rounded-xl border border-[rgba(232,93,117,0.3)] text-[#e85d75] font-medium text-sm hover:bg-[rgba(232,93,117,0.1)] transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/results')}
              className="flex-1 btn-gradient py-3 rounded-xl text-white font-medium text-sm"
            >
              View Results
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (!revealed) return
    const newAnswers = [...answers, selected === q.answer]
    setAnswers(newAnswers)
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">Question {current + 1} of {QUESTIONS.length}</span>
        <span className="text-[#e85d75] text-sm font-medium">{Math.round(((current) / QUESTIONS.length) * 100)}%</span>
      </div>
      <div className="w-full bg-[#2a1820] rounded-full h-2 mb-8">
        <div className="progress-bar h-2 rounded-full transition-all duration-300"
          style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card p-6 mb-4">
        <h3 className="text-white font-semibold text-lg mb-6">{q.q}</h3>
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let cls = 'border border-[rgba(232,93,117,0.15)] bg-[#2a1820] text-gray-300'
            if (revealed) {
              if (i === q.answer) cls = 'border border-green-500 bg-green-500/10 text-green-300'
              else if (i === selected && selected !== q.answer) cls = 'border border-red-500 bg-red-500/10 text-red-300'
            } else if (selected === i) {
              cls = 'border border-[#e85d75] bg-[rgba(232,93,117,0.1)] text-white'
            }
            return (
              <button
                key={i}
                onClick={() => { if (!revealed) { setSelected(i); setRevealed(true) } }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${cls} flex items-center gap-3`}
              >
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && i === q.answer && <CheckCircle size={16} className="shrink-0 text-green-400" />}
                {revealed && i === selected && selected !== q.answer && <XCircle size={16} className="shrink-0 text-red-400" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="card p-4 mb-6 border-l-4 border-[#e85d75]">
          <p className="text-gray-300 text-sm">{q.explanation}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={!revealed}
        className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${revealed ? 'btn-gradient text-white' : 'bg-[#2a1820] text-gray-600 cursor-not-allowed'}`}
      >
        {current + 1 >= QUESTIONS.length ? 'Finish Quiz' : 'Next Question'}
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
