import client, { setToken } from './client.js'

export async function register({ email, password, fullName }) {
  const { data } = await client.post('/api/auth/register', {
    email,
    password,
    fullName: fullName || null,
  })
  setToken(data.token)
  return data
}

export async function login({ email, password }) {
  const { data } = await client.post('/api/auth/login', { email, password })
  setToken(data.token)
  return data
}

export async function fetchMe() {
  const { data } = await client.get('/api/auth/me')
  return data
}
