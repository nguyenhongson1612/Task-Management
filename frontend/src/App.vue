<script setup>
import { onMounted, ref } from 'vue'
import { fetchApiHealth, fetchActuatorHealth } from './api/client.js'

const apiHealth = ref(null)
const actuatorHealth = ref(null)
const loading = ref(true)
const error = ref(null)

async function checkBackend() {
  loading.value = true
  error.value = null
  apiHealth.value = null
  actuatorHealth.value = null

  try {
    const [api, actuator] = await Promise.all([
      fetchApiHealth(),
      fetchActuatorHealth(),
    ])
    apiHealth.value = api
    actuatorHealth.value = actuator
  } catch (e) {
    error.value =
      e.response?.data?.message ||
      e.message ||
      'Không kết nối được backend. Hãy chạy Spring Boot trên cổng 8080.'
  } finally {
    loading.value = false
  }
}

onMounted(checkBackend)
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="badge">Vue 3 + Vite</div>
      <h1>Task Management</h1>
      <p class="subtitle">
        Frontend gọi API Spring Boot — monorepo backend + frontend
      </p>
    </header>

    <section class="card">
      <div class="card-head">
        <h2>Trạng thái Backend</h2>
        <button type="button" class="btn" :disabled="loading" @click="checkBackend">
          {{ loading ? 'Đang kiểm tra…' : 'Kiểm tra lại' }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <div v-else-if="loading" class="loading">Đang kết nối API…</div>

      <div v-else class="grid">
        <article class="status-card">
          <h3>/api/health</h3>
          <span
            class="pill"
            :class="apiHealth?.status === 'UP' ? 'up' : 'down'"
          >
            {{ apiHealth?.status ?? '—' }}
          </span>
          <dl>
            <dt>Service</dt>
            <dd>{{ apiHealth?.service ?? '—' }}</dd>
          </dl>
        </article>

        <article class="status-card">
          <h3>/actuator/health</h3>
          <span
            class="pill"
            :class="actuatorHealth?.status === 'UP' ? 'up' : 'down'"
          >
            {{ actuatorHealth?.status ?? '—' }}
          </span>
          <dl>
            <dt>Database</dt>
            <dd>{{ actuatorHealth?.components?.db?.status ?? '—' }}</dd>
            <dt>Disk</dt>
            <dd>{{ actuatorHealth?.components?.diskSpace?.status ?? '—' }}</dd>
          </dl>
        </article>
      </div>
    </section>

    <footer class="footer">
      <p>
        Dev: <code>npm run dev</code> (port 5173) · API proxy →
        <code>localhost:8080</code>
      </p>
    </footer>
  </div>
</template>
