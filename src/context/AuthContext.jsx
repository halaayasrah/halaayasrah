import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('zv_user')) } catch { return null }
  })

  function login(token, userData) {
    localStorage.setItem('zv_token', token)
    localStorage.setItem('zv_user', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('zv_token')
    localStorage.removeItem('zv_user')
    setUser(null)
  }

  function updateUser(data) {
    const updated = { ...user, ...data }
    localStorage.setItem('zv_user', JSON.stringify(updated))
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
