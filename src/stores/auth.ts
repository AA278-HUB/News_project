import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type User = {
  id: string
  name: string
  handle: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>({
    id: 'u_01',
    name: '林栀',
    handle: 'linzhi',
    email: 'linzhi@example.com',
  })

  const isLoggedIn = computed(() => user.value != null)

  function login() {
    user.value = {
      id: 'u_01',
      name: '林栀',
      handle: 'linzhi',
      email: 'linzhi@example.com',
    }
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, login, logout }
})

