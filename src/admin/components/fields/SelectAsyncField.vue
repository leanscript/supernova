<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="relative mt-2">
      <input
        id="combobox"
        type="text"
        v-model="search"
        @focus="toggleSelectButton"
        @input="searchData"
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-mana-blue-600 sm:text-sm sm:leading-6"
        role="combobox"
        aria-controls="options"
        aria-expanded="false"
        :placeholder="placeholder" />
      <button
        @click="toggleSelectButton"
        type="button"
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
      </button>

      <ul
        v-if="selectIsOpen"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        id="options"
        role="listbox">
        <li
          v-for="(item, i) in options"
          :key="i"
          @click="selectValue(item)"
          class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
          id="option-0"
          role="option"
          :class="
            item.key === (value && value.key)
              ? 'bg-mana-blue-600 text-white hover:bg-mana-blue-500'
              : ' hover:bg-mana-blue-200'
          ">
          <span class="block truncate">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ChevronUpDownIcon } from '@heroicons/vue/24/solid'
</script>
<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'SelectAsyncField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: Object, required: false, default: () => {} },
    validation: { type: Object, required: false, default: () => null },
    target: { type: String, required: true },
    filter: { type: String, required: false, default: () => null },
    labelCallback: { type: Function, required: true, default: () => {} },
  },
  data() {
    return {
      value: null,
      options: [],
      search: '',
      selectIsOpen: false,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    async searchData() {
      if (this.search !== '') {
        this.selectIsOpen = true
        const results = await this.$admin.search(this.target, this.search, this.filter)
        this.options = results.map((el) => ({
          key: el.id,
          label: this.labelCallback(el),
        }))
      }
    },
    selectValue(item) {
      this.value = item
      this.search = this.value.label
      this.options = []
      this.selectIsOpen = false
    },
    async toggleSelectButton() {
      if (!this.options.length && !this.selectIsOpen) {
        const results = await this.$admin.search(this.target, '', this.filter)
        this.options = results.map((el) => ({
          key: el.id,
          label: this.labelCallback(el),
        }))
        this.selectIsOpen = true
        return
      }
    },
  },
  watch: {
    search() {
      if (this.search === '') {
        this.options = []
      }
    },
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.registerField(
      this.id,
      this.initValue,
      'select',
      () => this.value && this.value.key,
      false,
      this.validation,
    )
    if (this.initValue) this.value = this.initValue
  },
}
</script>
