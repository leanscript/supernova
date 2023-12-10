<template>
  <nav
    v-if="breadcrumb"
    class="text-gray-900 font-semibold text-sm bg-white dark:bg-slate-800 dark:text-white"
    aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <li
        v-for="(item, key) in breadcrumb"
        :key="key"
        :class="{ 'text-gray-500 dark:text-white': key + 1 >= breadcrumb.length }"
        class="flex items-center mx-2">
        <router-link :to="item.route">
          {{ item.name }}
        </router-link>
        <span class="ml-4 mr-2" v-if="key < breadcrumb.length - 1">/</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { useLayoutStore } from '../../store/layout.store'
import { mapState } from 'pinia'

export default {
  setup() {
    const store = useLayoutStore()
    return { breadcrumb: store.breadcrumb }
  },
  computed: {
    ...mapState(useLayoutStore, ['shrink']),
  },
}
</script>
