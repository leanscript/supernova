<template>
  <div>
    <div
      aria-live="assertive"
      style="z-index: 500"
      class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4">
        <Transition>
          <div
            v-for="toast in $layout.toasts()"
            :key="toast.id"
            @click="$layout.clearToast(toast.id)"
            class="transition-all cursor-pointer pointer-events-auto w-full max-w-sm border border-white dark:border-slate-800 overflow-hidden rounded-lg text-sn-text bg-sn-primary shadow-sm ring-1 ring-sn-primary ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    v-if="toast.type === 'success'"
                    class="h-6 w-6 text-green-400 font-bold"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    v-if="toast.type === 'error'"
                    class="h-6 w-6 text-red-400 font-bold"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    v-if="toast.type === 'info'"
                    class="h-6 w-6 text-blue-400 font-bold"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-sn-text">{{ toast.title }}</p>
                  <p class="mt-1 text-sm text-sn-text">{{ toast.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div
      class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col"
      :class="layoutStore.shrink ? 'md:w-12' : 'md:w-64'"
    >
      <div
        class="flex min-h-0 flex-1 flex-col bg-sn-primary border-r border-white dark:border-slate-800"
      >
        <a href="/" class="flex h-16 flex-shrink-0 items-center px-4 bg-sn-primary">
          <img
            :class="layoutStore.shrink ? 'w-4 h-4' : 'h-8 w-8'"
            v-if="$admin.logo"
            :src="$admin.logo"
          />
          <p class="ml-4 font-bold uppercase text-sn-text">{{ $admin.name }}</p>
        </a>
        <div v-if="!layoutStore.shrink" class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 space-y-1/2 px-4 py-4 text-xs">
            <slot name="sidebar" />
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:pl-64" :class="layoutStore.shrink ? 'md:pl-12' : 'md:pl-64'">
      <div class="sticky top-0 z-10 flex h-16 dark:bg-slate-800 bg-white shadow">
        <div class="max-w-7xl my-auto ml-4 flex font-bold cursor-pointer">
          <Breadcrumb />
        </div>
        <div
          v-if="props.searchPalette"
          class="flex flex-1 justify-end px-4 my-auto font-bold text-sm mr-4"
        >
          <div class="max-w-lg mr-10">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-5 w-5 text-gray-400"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                autocomplete="off"
                id="search"
                name="search"
                class="block w-full rounded-md border-0 dark:bg-slate-900 dark:ring-gray-700 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sn-primary sm:text-sm sm:leading-6"
                placeholder="Rechercher"
                @click="paletteIsOpen = !paletteIsOpen"
                type="search"
              />
            </div>
          </div>
          <p class="mt-1 cursor-pointer dark:text-white text-gray-800">
            {{ authStore.user && authStore.user.email }}
          </p>
          <SearchPalette v-if="paletteIsOpen" @closePalette="() => closePalette()" />
        </div>
      </div>

      <main class="flex-1 min-h-screen dark:bg-slate-800 bg-white">
        <div class="py-6">
          <div class="mx-auto px-4 sm:px-6 md:px-8">
            <div class="top-0 left-0 right-0 bottom-0 opacity-70 h-100 w-100"></div>
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import SearchPalette from './SearchPalette.vue'
import { useLayoutStore } from '@/store/layout.store.js'
import { useAuthStore } from '@/store/auth.store.js'

const paletteIsOpen = ref(false)
const layoutStore = useLayoutStore()
const authStore = useAuthStore()

const props = defineProps({
  searchPalette: { type: Boolean, required: false, default: true }
})

const closePalette = () => (paletteIsOpen.value = false)
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
