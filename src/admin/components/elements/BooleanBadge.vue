<template>
  <span
    v-if="value"
    class="inline-flex items-center gap-x-1.5 border rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
    {{ labels.isTrue }}
  </span>
  <span
    v-else
    class="inline-flex items-center gap-x-1.5 border rounded-md bg-mana-red-100 px-2 py-1 text-xs font-medium text-mana-red-500">
    {{ labels.isFalse }}
  </span>
</template>

<script>
export default {
  name: 'BooleanBadge',
  props: {
    value: { type: Boolean, required: true },
    labels: {
      type: Object,
      required: false,
      default: () => ({ isTrue: 'Oui', isFalse: 'Non' }),
    },
  },
}
</script>
