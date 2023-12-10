<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <RangePicker
        v-model="value"
      />
    </div>
  </div>
</template>
<script setup>
  import { RangePicker } from '@leanscript/vtc'
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
        first: null,
        last: null,
      },
      showPicker: false,
      displayValue: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
    formatDate(date) {
      if (date) {
        return date.value.toISOString()
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
      () => this.formatDate(this.value.first),
      false,
      this.validation,
    )
    this.registerField(
      this.endId,
      this.initEndDate,
      'date',
      () => this.formatDate(this.value.last),
      false,
      this.validation,
    )

    if (this.initStartDate) {
      const date = dayjs(this.initStartDate)
      this.value.first = { id: date.valueOf(), value: date, type: 'date' }
    }

    if (this.initEndDate) {
      const date = dayjs(this.initEndDate)
      this.value.last = { id: date.valueOf(), value: date, type: 'date' }
    }
  },
}
</script>

