const BASE_URL = 'http://127.0.0.1:8000'

function getToken() {
  return localStorage.getItem('zv_token')
}

function authHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options)
  if (res.status === 401) {
    localStorage.removeItem('zv_token')
    localStorage.removeItem('zv_user')
    window.location.href = '/login'
  }
  return res
}

export const api = {
  login(username, password) {
    const form = new URLSearchParams()
    form.append('username', username)
    form.append('password', password)
    return request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    })
  },

  signup(data) {
    return request('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  },

  me() {
    return request('/me', { headers: authHeaders() })
  },

  getMyFiles() {
    return request('/my-vault', { headers: authHeaders() })
  },

  uploadFile(file) {
    const form = new FormData()
    form.append('file', file)
    return request('/upload-vault', {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    })
  },

  deleteFile(filename) {
    return request(`/delete-file/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
  },

  getQuestions() {
    return request('/awareness/questions')
  },

  submitQuiz(answers) {
    return request('/awareness/submit', {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })
  },

  updateProfile(data) {
    return request('/user/update-profile', {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  },

  uploadProfilePic(userId, file) {
    const form = new FormData()
    form.append('file', file)
    return request(`/upload-profile-pic/${userId}`, {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    })
  },

  enableMfa() {
    return request('/enable-2fa', {
      method: 'POST',
      headers: authHeaders(),
    })
  },

  changePassword(oldPassword, newPassword) {
    return request(
      `/profile/change-password?old_password=${encodeURIComponent(oldPassword)}&new_password=${encodeURIComponent(newPassword)}`,
      { method: 'PUT', headers: authHeaders() }
    )
  },
}
