<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="auth-page">
    <aside class="auth-brand">
      <div class="auth-brand-inner">
        <div class="logo-mark">TM</div>
        <h1>Task Management</h1>
        <p>Quản lý công việc cá nhân — đăng nhập an toàn với JWT.</p>
        <ul class="auth-features">
          <li>Theo dõi task theo từng tài khoản</li>
          <li>Mật khẩu mã hóa BCrypt</li>
          <li>API Spring Boot + PostgreSQL</li>
        </ul>
      </div>
    </aside>

    <main class="auth-main">
      <div class="auth-card">
        <header class="auth-card-header">
          <h2>{{ title }}</h2>
          <p v-if="subtitle">{{ subtitle }}</p>
        </header>
        <slot />
      </div>
    </main>
  </div>
</template>
