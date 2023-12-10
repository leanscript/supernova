<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="relative mt-4 rounded-md border h-10 p-1 bg-gray-200 w-1/3">
      <div class="relative w-full h-full flex items-center">
        <div
          @click="selected = !selected"
          class="w-full flex justify-center text-gray-400 cursor-pointer">
          <button>Oui</button>
        </div>
        <div
          @click="selected = !selected"
          class="w-full flex justify-center text-gray-400 cursor-pointer">
          <button>Non</button>
        </div>
      </div>
      <span
        :class="{ 'left-1/2 -ml-1': !selected, 'left-1': selected }"
        class="bg-white shadow text-sm flex font-semibold items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute">
        {{ selected ? 'Oui' : 'Non' }}
      </span>
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'BooleanField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: [String, Boolean], required: false, default: '' },
    validation: { type: Object, required: false, default: () => null },
  },
  data() {
    return {
      selected: false,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.selected = this.initValue
    this.registerField(this.id, this.initValue, 'text', () => this.selected, false, this.validation)
  },
}
</script>
