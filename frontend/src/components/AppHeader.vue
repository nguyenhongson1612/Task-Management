<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const route = useRoute()
const router = useRouter()
const { user, authLoading, refreshUser, logout: authLogout } = useAuth()

async function logout() {
  await authLogout(router)
}

onMounted(refreshUser)
watch(() => route.path, refreshUser)
</script>

<template>
  <header class="site-header">
    <div class="site-header-inner">
      <router-link to="/" class="site-logo">
        <span class="logo-mark-sm">TM</span>
        <span>Task Management</span>
      </router-link>

      <nav class="site-nav">
        <router-link to="/" class="nav-link" active-class="nav-link-active">
          Trang chủ
        </router-link>

        <template v-if="authLoading">
          <span class="nav-muted">…</span>
        </template>
        <template v-else-if="user">
          <span class="nav-user">{{ user.fullName || user.email }}</span>
          <button type="button" class="nav-btn nav-btn-outline" @click="logout">
            Đăng xuất
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link" active-class="nav-link-active">
            Đăng nhập
          </router-link>
          <router-link to="/register" class="nav-btn nav-btn-primary">
            Đăng ký
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 20, 25, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
}

.site-header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text);
  text-decoration: none;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
}

.site-logo:hover {
  opacity: 0.85;
}

.logo-mark-sm {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--accent) 0%, #6366f1 100%);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem 0.75rem;
  flex-wrap: wrap;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  padding: 0.45rem 0.65rem;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
}

.nav-link:hover {
  color: var(--text);
  background: rgba(59, 130, 246, 0.08);
}

.nav-link-active {
  color: var(--accent) !important;
  background: rgba(59, 130, 246, 0.12);
}

.nav-user {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.35rem 0.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
}

.nav-muted {
  font-size: 0.85rem;
  color: var(--muted);
  padding: 0 0.5rem;
}

.nav-btn {
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  border: 1px solid transparent;
}

.nav-btn-primary {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
}

.nav-btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.nav-btn-outline {
  color: var(--text);
  background: transparent;
  border-color: var(--border);
}

.nav-btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 640px) {
  .site-header-inner {
    padding: 0.65rem 1rem;
  }

  .site-logo span:not(.logo-mark-sm) {
    display: none;
  }

  .site-nav {
    gap: 0.35rem 0.5rem;
  }

  .nav-user {
    max-width: 100px;
    font-size: 0.8rem;
  }

  .nav-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.75rem;
  }
}
</style>
