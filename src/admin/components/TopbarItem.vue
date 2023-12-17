<template>
  <router-link
    :to="{ name: props.to.name }"
    :class="`text-sn-text hover:bg-sn-accent-lighter transition group flex items-center px-2 py-2 text-xs rounded-md ${linkIsActive}`"
  >
    <slot />
    {{ props.title }}
  </router-link>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  title: { type: String, required: true },
  to: { type: Object, required: true },
  regex: { type: String, required: false }
})

const linkIsActive = computed(() => {
  if (route) {
    const match = route.name.match(props.regex)
    if (match && match[0].length > 0) {
      return 'bg-sn-accent hover:bg-sn-accent-lighter'
    }
  }
  return null
})
</script>
