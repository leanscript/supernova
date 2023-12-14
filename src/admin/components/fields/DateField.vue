<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <DatePicker closeOnClick v-model="value" :displayValue="formatValue" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DatePicker } from '@leanscript/vtc'
import '@leanscript/vtc/dist/style.css'
</script>
<script lang="ts">
import { useFieldStore } from '@/store/fields.store'
import { mapState, mapActions } from 'pinia'
import dayjs from 'dayjs'

export default {
  name: 'DateField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: String, required: false, default: '' },
    validation: { type: Object, required: false, default: () => null },
    nullable: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      value: null
    }
  },
  methods: {
    clearValue() {
      this.value = null
      this.displayValue = null
      this.showPicker = false
      this.fields[this.id].value = null
    },
    ...mapActions(useFieldStore, ['registerField']),
    closeCalendar() {
      this.showPicker = false
    },
    formatDate() {
      if (this.value) {
        return this.value.value.toISOString()
      }
      return null
    },
    formatValue(date) {
      if (date.value) {
        return date.value.format('DD/MM/YYYY')
      }
      return null
    }
  },
  computed: {
    ...mapState(useFieldStore, ['fields'])
  },
  created() {
    this.registerField(
      this.id,
      this.initValue,
      'date',
      () => this.formatDate(),
      false,
      this.validation
    )
    if (this.initValue) {
      const date = dayjs(this.initValue)
      this.value = { id: date.valueOf(), value: date, type: 'date' }
    }
  }
}
</script>
