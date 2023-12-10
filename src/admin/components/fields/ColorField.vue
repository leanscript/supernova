<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="color"
        :name="id"
        :id="id"
        :placeholder="placeholder"
        @change="updateReflectedValue"
        v-model="fields[id].value"
        autocomplete="off"
        class="form-input border-gray-300 rounded-md focus:border-mana-blue-500 focus:ring-mana-blue-500 sm:text-sm" />
      <div class="h-6 w-6 ml-4 rounded-full mt-1" :style="{ background: reflectedValue }"></div>
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'ColorField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: String, required: false, default: '#000000' },
    validation: { type: Object, required: false, default: () => null },
  },
  data() {
    return {
      reflectedValue: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    updateReflectedValue() {
      this.reflectedValue = this.fields[this.id].value
    },
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.reflectedValue = this.initValue
    this.registerField(this.id, this.initValue, 'text', null, false, this.validation)
  },
}
</script>
