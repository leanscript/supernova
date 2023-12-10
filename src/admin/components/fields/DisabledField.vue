<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="id"
        :id="id"
        :value="displayValue"
        autocomplete="off"
        class="form-input flex-grow border-gray-300 rounded-md focus:border-mana-blue-500 focus:ring-mana-blue-500 sm:text-sm bg-gray-200 cursor-none"
        disabled />
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'DisabledField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: String, required: false, default: '' },
    displayValue: { type: String, required: true },
    validation: { type: Object, required: false, default: () => null },
  },
  data() {
    return {
      value: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.registerField(this.id, this.initValue, 'text', null, false, this.validation)
    if (this.initValue) this.value = this.initValue
  },
}
</script>
