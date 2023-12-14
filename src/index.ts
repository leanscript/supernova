import { AdminPlugin, registerAdminRoutes } from '@/admin/inject'
import AuthPlugin from './auth'
import { ResourceIndexMixin } from '@/admin/mixins/resourceIndex.mixin'
import { ResourceDetailMixin } from '@/admin/mixins/resourceDetail.mixin'
import { ResourceIndexComp } from '@/admin/mixins/resourceIndex'
import { ResourceDetailComp } from '@/admin/mixins/resourceDetail'

export {
  AdminPlugin,
  registerAdminRoutes,
  AuthPlugin,
  ResourceIndexMixin,
  ResourceDetailMixin,
  ResourceIndexComp,
  ResourceDetailComp
}
export * from './store'

import SidebarItem from '@/admin/components/SidebarItem.vue'

export { SidebarItem }
