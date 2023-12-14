<template>
  <router-link
    :to="addItemRoute"
    class="justify-end inline-flex items-center justify-center rounded-md border border-transparent bg-sn-accent px-4 h-8 py-2 text-sm font-medium text-sn-text shadow-sm hover:bg-sn-accent-lighter focus:outline-none focus:ring-2 focus:ring-sn-accent focus:ring-offset-2 sm:w-auto"
  >
    <p class="text-sm font-medium leading-none text-sn-text">{{ props.title }}</p>
  </router-link>
</template>
<script lang="ts" setup>
import { useAdminStore } from '@/store/admin.store'
import { defineProps, computed } from 'vue'

const adminStore = useAdminStore()
const props = defineProps({ title: { type: String, required: true } })
const addItemRoute = computed(() => ({ name: `${adminStore.target}_add` }))
</script>
