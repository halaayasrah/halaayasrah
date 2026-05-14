const BASE = '/api'

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
  return res.json()
}

export const api = {
  // Files
  getFiles: () => apiFetch('/files'),
  uploadFile: (formData) => apiFetch('/files/upload', { method: 'POST', body: formData }),
  deleteFile: (id) => apiFetch(`/files/${id}`, { method: 'DELETE' }),
  downloadUrl: (id) => `${BASE}/files/${id}/download`,

  // Quiz results
  getResults: () => apiFetch('/results'),
  saveResult: (result) =>
    apiFetch('/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }),

  // Profile
  getProfile: () => apiFetch('/profile'),
  updateProfile: (data) =>
    apiFetch('/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  // Statistics
  getStatistics: () => apiFetch('/statistics'),

  // Settings
  getSettings: () => apiFetch('/settings'),
  updateSettings: (data) =>
    apiFetch('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
}
