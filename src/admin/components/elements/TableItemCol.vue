<template>
  <td class="whitespace-nowrap pl-4 pr-3 text-gray-800 sm:pl-6">
    <div class="flex" :class="align">
      <p class="leading-none mr-2" :class="tw">
        <slot></slot>
      </p>
    </div>
  </td>
</template>

<script>
export default {
  name: 'TableItemCol',
  props: {
    tw: { type: String, required: false, default: '' },
    align: { type: String, required: false, default: 'items-center' },
  },
}
</script>
