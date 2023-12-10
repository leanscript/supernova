<template>
  <router-link
    :to="addItemRoute"
    class="justify-end inline-flex items-center justify-center rounded-md border border-transparent bg-sn-primary px-4 h-8 py-2 text-sm font-medium text-white shadow-sm hover:bg-sn-secondary focus:outline-none focus:ring-2 focus:ring-sn-primary focus:ring-offset-2 sm:w-auto">
    <p class="text-sm font-medium leading-none text-white">{{ title }}</p>
  </router-link>
</template>
<script>
import { useAdminStore } from '../../../store/admin.store'
import { mapState } from 'pinia'

export default {
  name: 'AddResourceButton',
  props: {
    title: { type: String, required: true },
  },
  computed: {
    ...mapState(useAdminStore, {
      target: 'target',
    }),
    addItemRoute() {
      return { name: `${this.target}_add` }
    },
  },
}
</script>
