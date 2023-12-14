<template>
  <nav
    class="flex items-center justify-between border-t border-gray-200 dark:bg-slate-800 dark:border-slate-700 bg-white px-4 py-3 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block" v-if="adminStore.resources.length">
      <p class="text-sm text-gray-700">
        Affichage de
        <span class="font-medium">{{ adminStore.pagination.from }}</span>
        à
        <span class="font-medium">{{ adminStore.pagination.to }}</span>
        de
        <span class="font-medium">{{ adminStore.pagination.total }}</span>
        résultats
      </p>
    </div>
    <div class="flex flex-1 justify-end sm:justify-end">
      <button
        v-if="adminStore.pagination.current_page !== 1"
        @click="previousPage"
        class="relative ml-3 inline-flex items-center rounded-md bg-white dark:bg-sn-accent dark:text-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        Précédent
      </button>
      <button
        v-if="adminStore.pagination.current_page !== adminStore.pagination.last_page"
        @click="nextPage"
        class="relative inline-flex items-center rounded-md bg-white dark:bg-sn-accent dark:text-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
      >
        Suivant
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 ml-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { inject } from 'vue'
import { useAdminStore } from '@/store/admin.store'
const adminStore = useAdminStore()

const $admin = inject('$admin')

const nextPage = () => {
    $admin.getManyCurrentPaginated(adminStore.target, adminStore.pagination.current_page + 1)
  },
  previousPage = () => {
    $admin.getManyCurrentPaginated(adminStore.target, adminStore.pagination.current_page - 1)
  }
</script>
