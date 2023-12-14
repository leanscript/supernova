<template>
  <span :class="customStyle">
    {{ props.label }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  accent: { type: String, required: true }
})

const customStyle = computed(
  () =>
    `bg-${props.accent}-100 text-${props.accent}-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium`
)
</script>
