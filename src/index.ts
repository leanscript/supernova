import { AdminPlugin, registerAdminRoutes } from '@/admin/inject'
import AuthPlugin from '@/auth'
import { ResourceIndexMixin } from '@/mixins/resourceIndex.mixin'
import { ResourceDetailMixin } from '@/mixins/resourceDetail.mixin'
import SidebarItem from '@/admin/components/SidebarItem.vue'
import TopbarItem from '@/admin/components/TopbarItem.vue'

const registerSupernovaRoutes = () => {}

export {
  AdminPlugin,
  registerAdminRoutes,
  AuthPlugin,
  ResourceIndexMixin,
  ResourceDetailMixin,
  ResourceIndexComp,
  ResourceDetailComp,
  SidebarItem,
  TopbarItem,
  registerSupernovaRoutes
}

export * from './store'
export * from './composables'
