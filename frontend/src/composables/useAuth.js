import { ref } from 'vue'
import { fetchMe } from '../api/auth.js'
import { clearToken, getToken } from '../api/client.js'

/** State dùng chung — Header và Home cùng một nguồn, logout không cần reload */
const user = ref(null)
const authLoading = ref(false)

export function useAuth() {
  async function refreshUser() {
    if (!getToken()) {
      user.value = null
      return
    }
    authLoading.value = true
    try {
      user.value = await fetchMe()
    } catch {
      clearToken()
      user.value = null
    } finally {
      authLoading.value = false
    }
  }

  function setUser(authUser) {
    user.value = authUser
  }

  async function logout(router) {
    clearToken()
    user.value = null
    if (router) {
      await router.push('/')
    }
  }

  return {
    user,
    authLoading,
    refreshUser,
    setUser,
    logout,
  }
}
