import { AdminPlugin, registerAdminRoutes } from './admin/inject.js';
import AuthPlugin from './auth.js'
import { ResourceIndexMixin } from './admin/mixins/resourceIndex.mixin.js'
import { ResourceDetailMixin } from './admin/mixins/resourceDetail.mixin.js'
import { ResourceIndexComp } from './admin/mixins/resourceIndex.js'
import { ResourceDetailComp } from './admin/mixins/resourceDetail.js'

export {
  AdminPlugin,
  registerAdminRoutes,
  AuthPlugin,
  ResourceIndexMixin,
  ResourceDetailMixin,
  ResourceIndexComp,
  ResourceDetailComp,
}
export * from './store';


import SidebarItem from './admin/components/SidebarItem.vue';

export { SidebarItem }
