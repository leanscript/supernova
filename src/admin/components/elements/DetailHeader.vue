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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            fill-rule="evenodd"
            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            clip-rule="evenodd"
          />
        </svg>

        Modifier
      </router-link>
      <button
        type="button"
        v-if="deleteBtn"
        class="ml-3 inline-flex items-center rounded-md border border-transparent bg-mana-red-600 px-4 py-1 text-sm font-medium text-white shadow-sm hover:bg-mana-red-700 focus:outline-none focus:ring-2 focus:ring-mana-red-500 focus:ring-offset-2 flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clip-rule="evenodd"
          />
        </svg>
        Supprimer
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
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
