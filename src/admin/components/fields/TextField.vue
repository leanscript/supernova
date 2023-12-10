<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 dark:text-white">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        v-model="fields[id].value"
        autocomplete="off"
        class="form-input flex-grow border-gray-300 dark:bg-slate-900 dark:border-slate-900 rounded-md focus:border-sn-secondary focus:ring-sn-secondary sm:text-sm"
        :disabled="disabled" />
    </div>
    <p class="mt-2 text-xs text-red-600" :key="i" v-for="(error, i) in fields[id].errors">{{ name }} {{ error.substr(4) }}</p>
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
