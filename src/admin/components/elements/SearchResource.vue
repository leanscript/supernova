<template>
  <div class="flex">
    <div class="relative w-full max-w-2xl focus-within:text-purple-500">
      <div class="pointer-events-none absolute inset-y-0 left-0 -top-2 flex items-center pl-3">
        <MagnifyingGlassIcon class="h-5 w-5 mt-2 text-gray-400" />
      </div>
      <input
        class="block w-full rounded-md border border-gray-300 dark:border-slate-900 dark:bg-slate-900 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-sn-accent focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sn-accent sm:text-sm"
        type="text"
        v-model="query"
        :placeholder="props.placeholder ?? 'Rechercher'"
        aria-label="Search"
      />
      <div
        v-if="results && results.length > 2"
        class="absolute bg-white py-2 w-full px-2 z-10 border rounded shadow-md"
      >
        <ul>
          <li
            class="cursor-pointer hover:bg-sn-transparent py-2 px-3 text-sm rounded transition"
            @click="goToResource(result)"
            v-for="(result, index) in results"
            :key="index"
          >
            {{ result[props.displayField] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import debounce from 'debounce'
import { defineProps, inject, onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  placeholder: { type: String, required: false, default: 'Rechercher' },
  target: { type: String, required: true },
  resource: { type: String, required: false, default: null },
  displayField: { type: String, required: true },
  filter: { type: String, required: false, default: null }
})

const query = ref('')
const results = ref([])
const adminResource = ref(null)

const $router = useRouter()
const $admin = inject('$admin')

onBeforeMount(() => {
  adminResource.value = !props.resource ? props.target : props.resource
})

const goToResource = (resource) => {
  $router.push({
    name: `${adminResource.value}_detail`,
    params: { id: resource.id }
  })
}

watch(
  query,
  debounce(async function () {
    results.value = []
    if (query.value !== '') {
      results.value = await $admin.search(props.target, query.value, props.filter)
    }
  }, 300)
)
</script>
