<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="flex text-sm">
      <div class="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200 mr-6">
        <div class="relative w-full h-full flex items-center">
          <div
            @click="selectedStart = !selectedStart"
            class="w-full flex justify-center text-gray-400 cursor-pointer">
            <button>Début le matin</button>
          </div>
          <div
            @click="selectedStart = !selectedStart"
            class="w-full flex justify-center text-gray-400 cursor-pointer">
            <button>Début l'après midi</button>
          </div>
        </div>
        <span
          :class="{
            'left-1/2 -ml-1 text-mana-blue-600 font-semibold': !selectedStart,
            'left-1 text-mana-blue-600 font-semibold': selectedStart,
          }"
          class="bg-white shadow text-sm flex items-center justify-center w-1/2 rounded  transition-all duration-150 ease-linear absolute"
          style="top: 4px;height:1.88rem"
          >{{ selectedStart ? 'Début le matin' : "Début l'après midi" }}</span
        >
      </div>

      <div class="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
        <div class="relative w-full h-full flex items-center">
          <div
            @click="selectedEnd = !selectedEnd"
            class="w-full flex justify-center text-gray-400 cursor-pointer">
            <button>Reprise le matin</button>
          </div>
          <div
            @click="selectedEnd = !selectedEnd"
            class="w-full flex justify-center text-gray-400 cursor-pointer">
            <button>Reprise l'après midi</button>
          </div>
        </div>
        <span
          :class="{
            'left-1/2 -ml-1 text-mana-blue-600 font-semibold': !selectedEnd,
            'left-1 text-mana-blue-600 font-semibold': selectedEnd,
          }"
          class="bg-white shadow text-sm flex items-center justify-center w-1/2 rounded transition-all duration-150 ease-linear absolute"
          style="top: 4px;height:1.88rem"
          >{{ selectedEnd ? 'Reprise le matin' : "Reprise l'après midi" }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'LeaveToggleField',
  field: true,
  props: {
    name: { type: String, required: true },
    startId: { type: String, required: true },
    endId: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initStartHalf: { type: Boolean, required: false, default: false },
    initEndHalf: { type: Boolean, required: false, default: false },
    validation: { type: Object, required: false, default: () => null },
  },
  data() {
    return {
      value: null,
      selectedStart: false,
      selectedEnd: false,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.selectedStart = this.initStartHalf
    this.selectedEnd = this.initEndHalf

    this.registerField(
      this.startId,
      this.selectedStart,
      'leave_toggle',
      () => this.selectedStart,
      false,
      this.validation,
    )
    this.registerField(
      this.endId,
      this.selectedEnd,
      'leave_toggle',
      () => this.selectedEnd,
      false,
      this.validation,
    )
  },
}
</script>
