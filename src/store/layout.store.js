import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    title: 'Supernova - Admin',
    breadcrumb: null,
    deleteModaleIsOpen: false,
    deleteModaleData: null,
    quickViewIsOpen: false,
    quickViewData: null,
    defaultFilter: false,
    shrink: false,
    toasts: [],
  }),
  actions: {
    setTitle(title) {
      this.title = title
    },
    openToast(data) {
      const id = Math.floor(Math.random()*100)
      this.toasts.push({ id, ...data })
      setTimeout(() => {
        this.toasts = this.toasts.filter(el => el.id !== id)
      }, 6000)
    },
    setBreadcrumb(breadcrumb) {
      this.breadcrumb = breadcrumb
    },
    reset() {
      this.breadcrumb = null
      this.title = null
      this.quickViewIsOpen = false
      this.quickViewData = null
      this.deleteModaleData = null
      this.deleteModaleIsOpen = false
      return
    },
    openDeleteModale(data) {
      this.deleteModaleData = data
      this.deleteModaleIsOpen = true
    },
    closeDeleteModale() {
      this.deleteModaleIsOpen = false
    },
    openQuickViewIsOpen(data) {
      this.quickViewData = data
      this.quickViewIsOpen = true
    },
    closeQuickViewIsOpen() {
      this.quickViewIsOpen = false
      this.quickViewData = null
    },
    getQuickViewData() {
      return this.quickViewData
    },
    setDefaultFilter(filter) {
      this.defaultFilter = filter
    },
  },
})
