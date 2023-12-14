import { useLayoutStore } from '@/store/layout.store'
import { useAdminStore } from '@/store/admin.store'
import { useFieldStore } from '@/store/fields.store'
import AdminLayout from '@/admin/components/AdminLayout.vue'
import * as components from './components'
import dayjs from 'dayjs'

import '@/admin/assets/style.css'

export const AdminPlugin = {
  install(app, options) {
    const pinia = app.config.globalProperties.$pinia

    for (const componentName in components) {
      const component = components[componentName]
      app.component(componentName, component)
    }

    app.component('AdminLayout', AdminLayout)

    app.config.globalProperties.$layout = {}
    app.config.globalProperties.$layout.store = () => useLayoutStore(pinia)
    app.config.globalProperties.$layout.setTitle = (config) => {
      const store = app.config.globalProperties.$layout.store()
      store.setTitle(config)
    }
    app.config.globalProperties.$layout.setBreadcrumb = (config) => {
      const store = app.config.globalProperties.$layout.store()
      store.setBreadcrumb(config)
    }

    app.config.globalProperties.$layout.getQuickViewData = () => {
      const store = app.config.globalProperties.$layout.store()
      return store.quickViewData
    }

    app.config.globalProperties.$layout.closeQuickView = () => {
      const store = app.config.globalProperties.$layout.store()
      return store.closeQuickViewIsOpen()
    }

    app.config.globalProperties.$layout.reduceSidebar = () => {
      const store = app.config.globalProperties.$layout.store()
      return (store.shrink = !store.shrink)
    }

    app.config.globalProperties.$layout.openToast = (data) => {
      const store = app.config.globalProperties.$layout.store()
      return store.openToast(data)
    }

    app.config.globalProperties.$layout.toasts = () => {
      const store = app.config.globalProperties.$layout.store()
      return store.toasts
    }

    app.config.globalProperties.$layout.clearToast = (id) => {
      const store = app.config.globalProperties.$layout.store()
      store.toasts = store.toasts.filter((el) => el.id !== id)
    }

    app.config.globalProperties.$auth = {}
    app.config.globalProperties.$auth.token = () => {
      return localStorage.getItem('supernova_token')
    }

    app.config.globalProperties.$admin = {}
    app.config.globalProperties.$admin.axios = options.axiosInstance
    app.config.globalProperties.$admin.primaryKey = options.primaryKey || 'id'
    app.config.globalProperties.$admin.search = options.searchMethod
    app.config.globalProperties.$admin.prefix = options.prefix
    app.config.globalProperties.$admin.logo = options.logo || null
    app.config.globalProperties.$admin.name = options.name || 'Supernova'
    app.config.globalProperties.$admin.store = () => useAdminStore(pinia)

    app.config.globalProperties.$fields = {}
    app.config.globalProperties.$fields.store = () => useFieldStore(pinia)
    app.config.globalProperties.$fields.formSerializer = options.formSerializer || null
    app.config.globalProperties.$fields.errorParser = options.errorParser || null

    app.config.globalProperties.$admin.api = {}
    app.config.globalProperties.$admin.api.get = async (uri) => {
      const res = await app.config.globalProperties.$admin.axios.get(uri)
      return res.data
    }

    app.config.globalProperties.$admin.config = options

    app.config.globalProperties.$admin.getTarget = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.target
    }

    app.config.globalProperties.$admin.getSelected = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.selected
    }

    app.config.globalProperties.$admin.resetSelected = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.resetSelected()
    }

    app.config.globalProperties.$admin.getManyResources = (resource, page = 1, perPage = 14) => {
      const store = app.config.globalProperties.$admin.store()
      const axiosInstance = app.config.globalProperties.$admin.axios
      store.getMany(resource, axiosInstance, page, perPage)
    }

    app.config.globalProperties.$admin.getManyCurrentPaginated = (resource, page = 1) => {
      const store = app.config.globalProperties.$admin.store()
      const axiosInstance = app.config.globalProperties.$admin.axios

      store.getMany(resource, axiosInstance, page, store.query)
    }

    app.config.globalProperties.$admin.getOneResource = (
      resource,
      id,
      include = null,
      query = null
    ) => {
      const store = app.config.globalProperties.$admin.store()
      const axiosInstance = app.config.globalProperties.$admin.axios
      store.getOne(resource, id, axiosInstance, include, query)
    }
    app.config.globalProperties.$admin.setSorting = (filter) => {
      const store = app.config.globalProperties.$admin.store()
      store.setSorting(filter)
    }

    app.config.globalProperties.$admin.setFilters = (filters) => {
      const store = app.config.globalProperties.$admin.store()
      store.setFilters(filters)
    }

    app.config.globalProperties.$admin.registerFilters = (filters) => {
      const store = app.config.globalProperties.$admin.store()
      store.registerFiltersDict(filters)
    }

    app.config.globalProperties.$admin.addOne = async (resource, data) => {
      const store = app.config.globalProperties.$admin.store()
      const axiosInstance = app.config.globalProperties.$admin.axios
      await store.addOne(resource, data, axiosInstance)
    }

    app.config.globalProperties.$admin.editOne = async (resource, id, data, bypass = false) => {
      const store = app.config.globalProperties.$admin.store()
      const axiosInstance = app.config.globalProperties.$admin.axios
      await store.editOne(resource, id, data, bypass, axiosInstance)
    }

    app.config.globalProperties.$admin.deleteOne = async (resource, id) => {
      const axiosInstance = app.config.globalProperties.$admin.axios
      await axiosInstance.delete(`/${resource}/${id}`)
    }

    app.config.globalProperties.$admin.setTarget = (resource) => {
      const store = app.config.globalProperties.$admin.store()
      store.setTarget(resource)
    }

    app.config.globalProperties.$fields.getFields = () => {
      const store = app.config.globalProperties.$fields.store()
      return store.fields
    }

    app.config.globalProperties.$fields.getField = (id) => {
      const store = app.config.globalProperties.$fields.store()
      return store.fields[id]
    }

    app.config.globalProperties.$resources = {}

    app.config.globalProperties.$resources.all = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.resources
    }

    app.config.globalProperties.$resources.get = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.resource
    }

    app.config.globalProperties.$resources.target = () => {
      const store = app.config.globalProperties.$admin.store()
      return store.target
    }

    app.config.globalProperties.$resources.humanDate = (date) => {
      return dayjs(date).format('DD/MM/YYYY')
    }

    app.config.globalProperties.$admin.sidebarItems = options.sidebar

    app.provide('$admin', app.config.globalProperties.$admin)
    app.provide('$resources', app.config.globalProperties.$resources)
    app.provide('$layout', app.config.globalProperties.$layout)
  }
}

export function registerAdminRoutes(router, app, module = null) {

  const { resources, prefix } = app.config.globalProperties.$admin.config

  for (const resource of resources) {
    if (resource.views.includes('index')) {
      const componentPath = `/src/views/${resource.key}/${resource.key}.index.vue`
      const cpFn = module ? module[componentPath] : () => import(componentPath)
      router.addRoute({
        path: `/${prefix}/${resource.key}`,
        name: `${resource.key}_index`,
        component: cpFn,
        meta: { auth: true }
      })
    }
    if (resource.views.includes('add')) {
      const componentPath = `/src/views/${resource.key}/${resource.key}.add.vue`
      const cpFn = module ? module[componentPath] : () => import(componentPath)
      router.addRoute({
        path: `/${prefix}/${resource.key}/add`,
        name: `${resource.key}_add`,
        component: cpFn,
        meta: { auth: true }
      })
    }
    if (resource.views.includes('detail')) {
      const componentPath = `/src/views/${resource.key}/${resource.key}.detail.vue`
      const cpFn = module ? module[componentPath] : () => import(componentPath)
      router.addRoute({
        path: `/${prefix}/${resource.key}/:id`,
        name: `${resource.key}_detail`,
        component: cpFn,
        meta: { auth: true }
      })
    }

    if (resource.views.includes('edit')) {
      const componentPath = `/src/views/${resource.key}/${resource.key}.edit.vue`
      const cpFn = module ? module[componentPath] : () => import(componentPath)
      router.addRoute({
        path: `/${prefix}/${resource.key}/:id/edit`,
        name: `${resource.key}_edit`,
        component: cpFn,
        meta: { auth: true }
      })
    }
  }
}
