<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="id"
        :id="id"
        :placeholder="placeholder || '0.0'"
        v-model="fields[id].value"
        autocomplete="off"
        class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mana-blue-600 sm:text-sm sm:leading-6"
        aria-describedby="price-currency" />
      <div class="pointer-events-none ml-4 inset-y-0 right-0 flex items-center pr-3">
        <span class="text-gray-500 sm:text-sm" id="price-currency">EUR</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'MoneyField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: [String, Number], required: false, default: null },
    validation: { type: Object, required: false, default: () => null },
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    getPrice() {
      return this.fields[this.id].value * 100
    },
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.registerField(
      this.id,
      this.initValue,
      'text',
      () => this.getPrice(),
      false,
      this.validation,
    )
  },
}
</script>
