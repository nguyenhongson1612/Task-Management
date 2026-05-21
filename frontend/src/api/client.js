import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
})

export async function fetchApiHealth() {
  const { data } = await client.get('/api/health')
  return data
}

export async function fetchActuatorHealth() {
  const { data } = await client.get('/actuator/health')
  return data
}
