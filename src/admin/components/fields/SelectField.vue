<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="relative mt-2">
      <button
        @click="selectIsOpen = !selectIsOpen"
        type="button"
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sn-primary sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label">
        <span class="block truncate">{{ value ? value.label : placeholder }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
        </span>
      </button>
      <ul
        v-if="selectIsOpen"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3">
        <li
          v-for="(item, i) in options"
          :key="i"
          @click="selectValue(item)"
          :class="
            item.key === (value && value.key)
              ? 'bg-sn-primary !text-white hover:bg-sn-secondary'
              : ' hover:bg-sn-transparent'
          "
          class="text-gray-900 text-sm relative select-none py-2 pl-3 pr-9 cursor-pointer"
          role="option">
          <span class="font-normal block truncate">{{ item.label }}</span>
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
  name: 'SelectField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: Object, required: false, default: () => {} },
    validation: { type: Object, required: false, default: () => null },
    options: { type: Array, required: true, default: () => [] },
  },
  data() {
    return {
      value: null,
      selectIsOpen: false,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    selectValue(item) {
      this.value = item
      this.selectIsOpen = false
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

<style scoped>
.vs__search {
  border: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
