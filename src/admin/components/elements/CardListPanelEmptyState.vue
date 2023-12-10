<template>
  <div>
    <p class="font-semibold text-sm text-gray-600 mt-4">{{ message }}</p>
    <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <div
        v-for="index in 6"
        :key="index"
        style="min-height: 4rem"
        class="flex m-h-12 w-full items-center justify-center bg-gray-100 rounded-md text-sm font-medium text-white"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardListPanelEmptyState',
  props: {
    message: { type: String, required: true },
  },
}
</script>
