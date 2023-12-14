<template>
  <span
    v-if="props.value"
    class="inline-flex items-center gap-x-1.5 border rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
  >
    {{ props.labels.isTrue }}
  </span>
  <span
    v-else
    class="inline-flex items-center gap-x-1.5 border rounded-md bg-mana-red-100 px-2 py-1 text-xs font-medium text-mana-red-500"
  >
    {{ props.labels.isFalse }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  value: { type: Boolean, required: true },
  labels: {
    type: Object,
    required: false,
    default: () => ({ isTrue: 'Oui', isFalse: 'Non' })
  }
})
</script>
