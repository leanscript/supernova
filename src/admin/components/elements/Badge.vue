<template>
  <span :class="customStyle">
    {{ label }}
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    label: { type: String, required: true },
    accent: { type: String, required: true },
  },
  computed: {
    customStyle() {
      return `bg-${this.accent}-100 text-${this.accent}-700 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium`
    },
  },
}
</script>
