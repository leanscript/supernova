<template>
  <div v-if="hasActiveFilters" class="flex justify-end">
    <div class="max-w-7xl sm:flex sm:items-center sm:px-6 lg:px-8">
      <h3 class="text-sm font-medium text-gray-500">Filtres actifs</h3>

      <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"></div>

      <div class="mt-2 sm:ml-4 sm:mt-0">
        <div class="-m-1 flex flex-wrap items-center">
          <span
            v-for="filter in activeFilters"
            :key="filter.value"
            class="m-1 inline-flex items-center rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
            <span>{{ filter.title }}</span>
            <button
              @click="deleteFilter(filter)"
              type="button"
              class="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500">
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdminStore } from '../../../store/admin.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'FiltersList',
  computed: {
    ...mapState(useAdminStore, ['filtersDict', '_filters']),
    hasActiveFilters() {
      return Object.entries(this._filters).filter((el) => el[1].length > 0).length > 0
    },
    activeFilters() {
      const arr = []
      Object.values(this._filters)
        .filter((el) => el.length > 0)
        .forEach((el) => arr.push(...el))

      return arr.map((el) => this.filtersDict.find((item) => item.value === el))
    },
  },
  methods: {
    ...mapActions(useAdminStore, ['removeFilter']),
    deleteFilter(filter) {
      this.removeFilter(filter)
      this.$admin.getManyResources(this.$admin.store().target)
    },
  },
}
</script>
