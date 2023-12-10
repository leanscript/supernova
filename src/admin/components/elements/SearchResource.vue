<template>
  <div class="flex">
    <div class="relative w-full max-w-2xl focus-within:text-purple-500">
      <div class="pointer-events-none absolute inset-y-0 left-0 -top-2 flex items-center pl-3">
        <MagnifyingGlassIcon class="h-5 w-5 mt-2 text-gray-400" />
      </div>
      <input
        class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        type="text"
        v-model="query"
        :placeholder="placeholder ?? 'Rechercher'"
        aria-label="Search" />
      <div
        v-if="results && results.length > 2"
        class="absolute bg-white py-2 w-full px-2 z-10 border rounded shadow-md">
        <ul>
          <li
            class="cursor-pointer hover:bg-blue-100 py-2 px-3 text-sm rounded transition"
            @click="goToResource(result)"
            v-for="(result, index) in results"
            :key="index">
            {{ result[displayField] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
</script>
<script>
import debounce from 'debounce'

export default {
  name: 'SearchResource',
  props: {
    placeholder: { type: String, required: false, default: 'Rechercher' },
    target: { type: String, required: true },
    resource: { type: String, required: false, default: null },
    displayField: { type: String, required: true },
    filter: { type: String, required: false, default: null },
  },
  data() {
    return {
      query: '',
      results: [],
      adminResource: null,
    }
  },
  created() {
    if (!this.resource) {
      this.adminResource = this.target
    } else {
      this.adminResource = this.resource
    }
  },
  methods: {
    goToResource(resource) {
      this.$router.push({
        name: `${this.adminResource}_detail`,
        params: { id: resource.id },
      })
    },
  },
  watch: {
    query: debounce(async function () {
      this.results = []
      if (this.query !== '') {
        this.results = await this.$admin.search(this.target, this.query, this.filter)
      }
    }, 300),
  },
}
</script>
