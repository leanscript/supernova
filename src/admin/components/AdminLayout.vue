<template>
  <div>
    <div aria-live="assertive" style="z-index:500" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div class="flex w-full flex-col items-center space-y-4">
        <Transition>
        <div v-for="toast in $layout.toasts()" :key="toast.id" @click="$layout.clearToast(toast.id)" class="transition-all cursor-pointer pointer-events-auto w-full max-w-sm border border-white dark:border-slate-800 overflow-hidden rounded-lg text-sn-text bg-sn-primary shadow-sm ring-1 ring-sn-primary ring-opacity-5">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="toast.type === 'success'" class="h-6 w-6 text-green-400 font-bold"/>
                <ExclamationCircleIcon v-if="toast.type === 'error'" class="h-6 w-6 text-red-400 font-bold"/>
                <InformationCircleIcon v-if="toast.type === 'info'" class="h-6 w-6 text-blue-400 font-bold"/>
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
      :class="shrink ? 'md:w-12' : 'md:w-64'">
      <div class="flex min-h-0 flex-1 flex-col bg-sn-primary border-r border-white dark:border-slate-800">
        <a href="/" class="flex h-16 flex-shrink-0 items-center px-4 bg-sn-primary" >
          <img :class="shrink ? 'w-4 h-4' : 'h-8 w-8'" v-if="$admin.logo" :src="$admin.logo" />
          <p class="ml-4 font-bold uppercase text-sn-text">{{ $admin.name }}</p>
        </a>
        <div v-if="!shrink" class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 space-y-1/2 px-4 py-4 text-xs">
            <slot name="sidebar" />
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:pl-64" :class="shrink ? 'md:pl-12' : 'md:pl-64'">
      <div class="sticky top-0 z-10 flex h-16 dark:bg-slate-800 bg-white shadow">
        <div class="max-w-7xl my-auto ml-4 flex font-bold cursor-pointer">
          <Breadcrumb />
        </div>
        <div v-if="searchPalette" class="flex flex-1 justify-end px-4 my-auto font-bold text-sm mr-4">
          <div class="max-w-lg mr-10">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                autocomplete="off"
                id="search"
                name="search"
                class="block w-full rounded-md border-0 dark:bg-slate-900 dark:ring-gray-700 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sn-primary sm:text-sm sm:leading-6"
                placeholder="Rechercher"
                @click="paletteIsOpen = !paletteIsOpen"
                type="search" />
            </div>
          </div>
          <p class="mt-1 cursor-pointer dark:text-white text-gray-800">{{ user && user.email }}</p>
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

<script setup>
import SidebarItem from './SidebarItem.vue'
import Breadcrumb from './Breadcrumb.vue'
import SearchPalette from './SearchPalette.vue'

import {
  EyeIcon,
  CalendarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  Cog8ToothIcon,
  BeakerIcon,
  AcademicCapIcon,
  FolderIcon,
} from '@heroicons/vue/24/solid'
</script>

<script>
import { mapState } from 'pinia'
import { useLayoutStore } from '../../store/layout.store.js'
import { useAuthStore } from '../../store/auth.store.js'

export default {
  name: 'AdminLayout',
  data() {
    return {
      paletteIsOpen: false,
    }
  },
  props: {
    searchPalette: { type: Boolean, required: false, default: true },
  },
  methods: {
    closePalette() {
      this.paletteIsOpen = false
    },
  },
  computed: {
    ...mapState(useLayoutStore, ['title', 'shrink']),
    ...mapState(useAuthStore, ['user']),
  },
}
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
