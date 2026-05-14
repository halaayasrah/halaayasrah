import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import UploadFiles from './pages/UploadFiles'
import MyFiles from './pages/MyFiles'
import Profile from './pages/Profile'
import AwarenessQuiz from './pages/AwarenessQuiz'
import MyResults from './pages/MyResults'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="upload" element={<UploadFiles />} />
            <Route path="files" element={<MyFiles />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quiz" element={<AwarenessQuiz />} />
            <Route path="results" element={<MyResults />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
