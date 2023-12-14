<template>
  <div class="md:flex md:items-center md:justify-between">
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-sm font-medium leading-6 text-gray-500">
        {{ subtitle }}
      </p>
    </div>
    <div class="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
      <slot name="actions" />
      <router-link
        v-if="editBtn"
        :to="editLink"
        type="button"
        class="ml-3 inline-flex items-center rounded-md border border-transparent bg-mana-blue-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-mana-blue-700 focus:outline-none focus:ring-2 focus:ring-mana-blue-500 focus:ring-offset-2 flex"
      >
        <Cog8ToothIcon class="w-5 h-5 mr-2" />
        Modifier
      </router-link>
      <button
        type="button"
        v-if="deleteBtn"
        class="ml-3 inline-flex items-center rounded-md border border-transparent bg-mana-red-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-mana-red-700 focus:outline-none focus:ring-2 focus:ring-mana-red-500 focus:ring-offset-2 flex"
      >
        <TrashIcon class="w-5 h-5 mr-2" />
        Supprimer
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Cog8ToothIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { defineProps, computed, inject } from 'vue'

const $admin = inject('$admin')

const { editBtn, deleteBtn, title, subtitle } = defineProps({
  editBtn: { type: Boolean, required: false, default: false },
  deleteBtn: { type: Boolean, required: false, default: false },
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: '' }
})

const editLink = computed(() => {
  return {
    name: `${$admin.getTarget()}_edit`,
    params: { id: $route.params.id }
  }
})
</script>
