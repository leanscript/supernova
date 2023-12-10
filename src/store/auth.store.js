import { defineStore } from 'pinia'
//import apiClient from '@/api/axios.js'

export const useAuthStore = defineStore('authStore', {
  state: () => ({ user: {}, token: null, isAuthentified: false }),
  actions: {
    async getUserInfos(userData) {
      this.user = userData
      if (this.user) this.isAuthentified = true
      return this.user
      return {}
    },
    async logout() {
      this.isAuthentified = false
      this.user = {}
      this.token = null
      localStorage.removeItem('supernova_token')
    },
  },
})
