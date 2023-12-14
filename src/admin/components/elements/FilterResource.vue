<template>
  <div class="">
    <section aria-labelledby="filter-heading">
      <div class="pb-4">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div class="sm:block">
            <div class="flow-root">
              <div class="-mx-4 flex items-center divide-x divide-gray-200">
                <div class="relative inline-block px-4 text-left">
                  <button
                    type="button"
                    @click.stop="filterIsOpen = !filterIsOpen"
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    aria-expanded="false"
                  >
                    <span>{{ props.name }}</span>
                    <span
                      v-if="filterCount"
                      class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                    >
                      {{ filterCount }}
                    </span>
                    <svg
                      class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="filterIsOpen"
                    class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <form class="space-y-4">
                      <div
                        v-for="(filter, index) in props.filters"
                        :key="index"
                        class="flex items-center"
                      >
                        <input
                          type="checkbox"
                          v-model="selectedFilters[filter.value]"
                          @click="toggleFilter(filter)"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >{{ filter.title }}</label
                        >
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, onBeforeMount, inject, computed, watch } from 'vue'
import { useAdminStore } from '@/store/admin.store'
const props = defineProps({
  filters: { type: Array, required: true },
  name: { type: String, required: true }
})
const filterIsOpen = ref(false)
const adminStore = useAdminStore()
const $admin = inject('$admin')

const filterKey = computed(() => props.filters[0].key)
const filterCount = computed(() => {
  if (adminStore._filters[filterKey.value]) {
    return adminStore._filters[filterKey.value].length
  }
  return 0
})

const selectedFilters = ref({})

adminStore.$subscribe((mutation, state) => {
  if (mutation.events.key === 'filter') {
    const parsedFiltersValues = selectedFilters.value
    Object.entries(selectedFilters.value).forEach((entry) => {
      parsedFiltersValues[entry[0]] = state._filters[filterKey.value].includes(entry[0])
    })
    selectedFilters.value = parsedFiltersValues
  }
})

const closeDropdown = () => (filterIsOpen.value = false)
const toggleFilter = (filter) => {
  selectedFilters.value[filter.value] = !selectedFilters.value[filter.value]

  const activeFilters = Object.entries(selectedFilters.value)
    .filter((el) => el[1])
    .map((el) => el[0])

  const filters = {}

  filters[filter.key] = activeFilters

  if (activeFilters.length > 0) {
    $admin.setFilters(filters)
    $admin.getManyResources($admin.store().target)
  } else {
    let obj = []
    obj[props.filters[0].key] = []
    $admin.setFilters(obj)
    $admin.getManyResources($admin.store().target)
  }
}
onBeforeMount(() => {
  adminStore._filters[filterKey.value] = []

  $admin.registerFilters(props.filters)

  props.filters.forEach((el) => {
    selectedFilters.value[el.value] = el.selected
    if (el.selected) {
      adminStore._filters[filterKey.value].push(el.value)
    }
  })
})
</script>
