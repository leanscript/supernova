<template>
  <div class="flex inline-flex content-left mr-6">
    <div class="relative inline-block">
      <div
        @click="showDropdown = !showDropdown"
        v-click-outside="closeDropdown"
        class="flex font-medium text-gray-700 cursor-pointer text-sm">
        <p v-if="selected && selected.direction === -1" class="w-5 h-5 text-gray-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
          </svg>
        </p>
        <p v-if="selected && selected.direction === 1" class="w-5 h-5 text-gray-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
          </svg>
        </p>
        <p>Trier par</p>
        <button
          aria-label="select"
          class="focus:text-blue-600 font-bold focus:outline-none bg-transparent ml-1">
          {{ selected && `${selected.name} &nbsp; ` }}
        </button>
      </div>
      <div
        v-if="showDropdown"
        class="absolute right-0 bg-white w-[200px] z-10 border rounded shadow-md">
        <button v-if="selected" @click="resetSorting" class="py-1 text-sm hover:bg-gray-200 w-full">
          Remettre à zéro
        </button>
        <div class="py-3 px-3 rounded transition" v-for="(scope, index) in scopes" :key="index">
          <div class="grid grid-cols-4 justify-start">
            <p class="mt-1 ml-2 font-medium col-span-2 text-sm">
              {{ scope.name }}
            </p>
            <div>
              <button
                @click="setSorting(scope, 1)"
                class="bg-gray-200 hover:bg-gray-300 border px-2 py-1 mx-1 rounded flex"
                :class="
                  selected && scope.key === selected.key && selected.direction === 1
                    ? 'bg-blue-300 hover:bg-blue-400'
                    : ''
                ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                </svg>
              </button>
            </div>
            <div>
              <button
                @click="setSorting(scope, -1)"
                class="bg-gray-200 hover:bg-gray-300 border px-2 py-1 mx-1 rounded flex"
                :class="
                  selected && scope.key === selected.key && selected.direction === -1
                    ? 'bg-blue-300 hover:bg-blue-400'
                    : ''
                ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdminStore } from '../../../store/admin.store'
import { mapState } from 'pinia'

export default {
  name: 'SortResource',
  data() {
    return {
      selected: null,
      showDropdown: false,
    }
  },
  watch: {
    selected(value) {
      if (value) {
        const { direction, key } = this.selected
        this.$admin.setSorting({ key, direction })
        this.$admin.getManyResources(this.$admin.store().target)
      } else {
        this.query['sort'] = {}
        this.$admin.getManyResources(this.$admin.store().target)
      }
    },
  },
  computed: {
    ...mapState(useAdminStore, ['query']),
  },
  methods: {
    setSorting(scope, direction) {
      this.selected = { ...scope, direction }
    },
    resetSorting() {
      this.selected = null
      this.showDropdown = false
    },
    closeDropdown() {
      this.showDropdown = false
    },
  },
  props: {
    scopes: { type: Array, required: true },
  },
}
</script>
