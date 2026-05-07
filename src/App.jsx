import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import UploadFiles from './pages/UploadFiles'
import MyFiles from './pages/MyFiles'
import Profile from './pages/Profile'
import AwarenessQuiz from './pages/AwarenessQuiz'
import MyResults from './pages/MyResults'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
      </Routes>
    </BrowserRouter>
  )
}
