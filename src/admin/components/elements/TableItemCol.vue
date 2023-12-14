<template>
  <td class="whitespace-nowrap pl-4 pr-3 dark:text-gray-100 text-gray-800 sm:pl-6">
    <div class="flex" :class="align">
      <p class="leading-none mr-2" :class="tw">
        <slot></slot>
      </p>
    </div>
  </td>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const { tw, align } = defineProps({
  tw: { type: String, required: false, default: '' },
  align: { type: String, required: false, default: 'items-center' }
})
</script>
