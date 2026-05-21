<script setup>
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth.js'
import { fetchApiHealth, fetchActuatorHealth } from '../api/client.js'

const { user, refreshUser } = useAuth()
const pageLoading = ref(true)
const apiHealth = ref(null)
const actuatorHealth = ref(null)
const healthError = ref(null)

async function loadPage() {
  pageLoading.value = true
  await refreshUser()
  await checkBackend()
  pageLoading.value = false
}

async function checkBackend() {
  healthError.value = null
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
    healthError.value = e.response?.data?.detail || e.message || 'Không kết nối backend'
  }
}

onMounted(loadPage)
</script>

<template>
  <div class="page dashboard">
    <div v-if="pageLoading" class="loading page-loading">Đang tải…</div>

    <template v-else>
      <section v-if="!user" class="hero card">
        <div class="badge">Task Management</div>
        <h1>Quản lý công việc của bạn</h1>
        <p class="subtitle hero-text">
          Đăng ký tài khoản để bắt đầu. Trang chủ luôn mở — không cần đăng nhập để xem.
        </p>
        <div class="hero-actions">
          <router-link to="/register" class="btn btn-primary">Bắt đầu miễn phí</router-link>
          <router-link to="/login" class="btn btn-outline">Đăng nhập</router-link>
        </div>
      </section>

      <section v-else class="hero card hero-logged">
        <div class="badge">Xin chào</div>
        <h1>{{ user.fullName || user.email }}</h1>
        <p class="subtitle">{{ user.email }}</p>
      </section>

      <section v-if="user" class="card user-card">
        <h2 class="section-title">Tài khoản</h2>
        <dl class="user-meta">
          <div>
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
          </div>
          <div>
            <dt>Họ tên</dt>
            <dd>{{ user.fullName || '—' }}</dd>
          </div>
          <div>
            <dt>Tham gia</dt>
            <dd>
              {{ user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '—' }}
            </dd>
          </div>
        </dl>
      </section>
    </template>
  </div>
</template>
