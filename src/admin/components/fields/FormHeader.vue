<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      <b>{{ title }}</b>
    </h3>
    <p class="mt-1 text-sm text-gray-500" v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormHeader',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: false, default: null },
  },
}
</script>
