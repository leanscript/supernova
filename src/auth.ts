import { useAuthStore } from './store/auth.store'

export default {
  install: (app) => {
    const pinia = app.config.globalProperties.$pinia
    app.config.globalProperties.$auth = {}
    app.config.globalProperties.$auth.store = () => useAuthStore(pinia)
    app.config.globalProperties.$auth.user = () => {
      const store = app.$layout.store()
      return store.user
    }
  }
}
