<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth.js'
import { useAuth } from '../composables/useAuth.js'
import AuthLayout from '../layouts/AuthLayout.vue'
import { parseApiError } from '../utils/errors.js'

const router = useRouter()
const { setUser } = useAuth()

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)

async function onSubmit() {
  error.value = null

  if (password.value !== confirmPassword.value) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Mật khẩu tối thiểu 6 ký tự'
    return
  }

  loading.value = true
  try {
    const data = await register({
      email: email.value.trim(),
      password: password.value,
      fullName: fullName.value.trim() || null,
    })
    setUser(data.user)
    await router.push('/')
  } catch (e) {
    error.value = parseApiError(e, 'Không thể tạo tài khoản')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout
    title="Đăng ký"
    subtitle="Tạo tài khoản mới để bắt đầu quản lý task."
  >
    <form class="auth-form" @submit.prevent="onSubmit">
      <div v-if="error" class="alert alert-error" role="alert">{{ error }}</div>

      <label class="field">
        <span>Họ và tên</span>
        <input
          v-model="fullName"
          type="text"
          autocomplete="name"
          placeholder="Nguyễn Văn A"
        />
      </label>

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
            autocomplete="new-password"
            required
            minlength="6"
            placeholder="Tối thiểu 6 ký tự"
          />
          <button
            type="button"
            class="input-toggle"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Ẩn' : 'Hiện' }}
          </button>
        </div>
      </label>

      <label class="field">
        <span>Xác nhận mật khẩu</span>
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          required
          minlength="6"
          placeholder="Nhập lại mật khẩu"
        />
      </label>

      <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
        <span v-if="loading" class="spinner" aria-hidden="true" />
        {{ loading ? 'Đang tạo tài khoản…' : 'Đăng ký' }}
      </button>
    </form>

    <p class="auth-footer-link">
      Đã có tài khoản?
      <router-link to="/login">Đăng nhập</router-link>
    </p>
  </AuthLayout>
</template>
