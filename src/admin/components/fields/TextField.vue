<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        v-model="fields[id].value"
        autocomplete="off"
        class="form-input flex-grow border-gray-300 rounded-md focus:border-sn-secondary focus:ring-sn-secondary sm:text-sm"
        :disabled="disabled" />
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'TextField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: String, required: false, default: '' },
    validation: { type: Object, required: false, default: () => null },
    disabled: { type: Boolean, required: false, default: false },
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.registerField(this.id, this.initValue || null, 'text', null, false, this.validation)
  },
}
</script>
