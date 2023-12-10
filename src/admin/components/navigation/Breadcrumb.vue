<template>
  <nav
    v-if="breadcrumb"
    class="text-black font-bold bg-white shadow rounded"
    aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <li
        v-for="(item, key) in breadcrumb"
        :key="key"
        :class="{ 'text-gray-500': key + 1 >= breadcrumb.length }"
        class="flex items-center">
        <router-link :to="item.route">
          {{ item.name }}
        </router-link>
        /
      </li>
    </ol>
  </nav>
</template>

<script>
import { useLayoutStore } from '@/store/layout.store'

export default {
  setup() {
    const store = useLayoutStore()
    return { breadcrumb: store.breadcrumb }
  },
}
</script>
