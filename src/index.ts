import { AdminPlugin, registerAdminRoutes } from '@/admin/inject'
import AuthPlugin from '@/auth'
import { ResourceIndexMixin } from '@/mixins/resourceIndex.mixin'
import { ResourceDetailMixin } from '@/mixins/resourceDetail.mixin'

const registerSupernovaRoutes = () => {}

export {
  AdminPlugin,
  registerAdminRoutes,
  AuthPlugin,
  ResourceIndexMixin,
  ResourceDetailMixin,
  registerSupernovaRoutes
}

export * from './store'
export * from './composables'
