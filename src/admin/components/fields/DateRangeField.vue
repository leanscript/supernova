<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <DatePicker
        v-model="value"
        class="w-full"
        color="custom"
        :columns="2"
        is-range
        style="margin-top: 40px; position: absolute !important; z-index: 1000"
        v-if="showPicker" />
      <input
        @click="showPicker = !showPicker"
        class="form-input w-full flex flex-grow border-gray-300 rounded-md focus:border-mana-blue-500 focus:ring-mana-blue-500 sm:text-sm"
        :placeholder="placeholder"
        :value="displayValue" />
    </div>
  </div>
</template>
<script setup>
  import { DatePicker } from 'v-calendar'
</script>
<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'
import dayjs from 'dayjs'

export default {
  name: 'DateRangeField',
  field: true,
  props: {
    name: { type: String, required: true },
    startId: { type: String, required: true },
    endId: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initStartDate: { type: String, required: false, default: '' },
    initEndDate: { type: String, required: false, default: '' },
    validation: { type: Object, required: false, default: () => null },
  },
  data() {
    return {
      value: {
        start: null,
        end: null,
      },
      showPicker: false,
      displayValue: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    formatDate(date) {
      if (date) {
        return dayjs(date).unix()
      }
      return null
    },
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  watch: {
    value(newVal) {
      if (newVal.start && newVal.end) {
        let displayValue = dayjs(this.value.start).format('DD/MM/YYYY')
        this.displayValue = `${displayValue} - ${dayjs(this.value.end).format('DD/MM/YYYY')}`
      }
      this.showPicker = false
    },
  },
  created() {
    const initValue = { start: this.initStartDate, end: this.initEndDate }

    this.registerField(
      this.startId,
      this.initStartDate,
      'date',
      () => this.formatDate(this.value.start),
      false,
      this.validation,
    )
    this.registerField(
      this.endId,
      this.initEndDate,
      'date',
      () => this.formatDate(this.value.end),
      false,
      this.validation,
    )

    if (initValue) this.value = initValue
  },
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  border: 1px solid rgb(209 213 219);
  padding-top: 2px;
  margin-bottom: 4px !important;
  color: #6b7280;
  @apply text-sm;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

.vc-custom {
  --vc-accent-50:  var(--sn-primary);
  --vc-accent-100: var(--sn-primary);
  --vc-accent-200: var(--sn-primary);
  --vc-accent-300: var(--sn-primary);
  --vc-accent-400: var(--sn-primary);
  --vc-accent-500: var(--sn-primary);
  --vc-accent-600: var(--sn-primary);
  --vc-accent-700: var(--sn-primary);
  --vc-accent-800: var(--sn-primary);
  --vc-accent-900: var(--sn-primary);
}
</style>
