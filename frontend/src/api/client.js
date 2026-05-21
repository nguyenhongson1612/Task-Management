import axios from 'axios'

export const TOKEN_KEY = 'task_management_token'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export default client

export async function fetchApiHealth() {
  const { data } = await client.get('/api/health')
  return data
}

export async function fetchActuatorHealth() {
  const { data } = await client.get('/actuator/health')
  return data
}
