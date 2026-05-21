<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/auth.js'
import { useAuth } from '../composables/useAuth.js'
import AuthLayout from '../layouts/AuthLayout.vue'
import { parseApiError } from '../utils/errors.js'

const router = useRouter()
const { setUser } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    const data = await login({ email: email.value.trim(), password: password.value })
    setUser(data.user)
    await router.push('/')
  } catch (e) {
    error.value = parseApiError(e, 'Email hoặc mật khẩu không đúng')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout
    title="Đăng nhập"
    subtitle="Chào mừng trở lại. Nhập email và mật khẩu của bạn."
  >
    <form class="auth-form" @submit.prevent="onSubmit">
      <div v-if="error" class="alert alert-error" role="alert">{{ error }}</div>

      <label class="field">
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          required
          placeholder="ban@email.com"
        />
      </label>

      <label class="field">
        <span>Mật khẩu</span>
        <div class="input-wrap">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            minlength="6"
            placeholder="••••••••"
          />
          <button
            type="button"
            class="input-toggle"
            :aria-label="showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Ẩn' : 'Hiện' }}
          </button>
        </div>
      </label>

      <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
        <span v-if="loading" class="spinner" aria-hidden="true" />
        {{ loading ? 'Đang đăng nhập…' : 'Đăng nhập' }}
      </button>
    </form>

    <p class="auth-footer-link">
      Chưa có tài khoản?
      <router-link to="/register">Đăng ký ngay</router-link>
    </p>
  </AuthLayout>
</template>
