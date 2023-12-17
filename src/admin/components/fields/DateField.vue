<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-700">{{ props.name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <DatePicker closeOnClick v-model="value" :displayValue="formatValue" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DatePicker } from '@leanscript/vtc'
import '@leanscript/vtc/dist/style.css'
import dayjs from 'dayjs'
import { useFieldStore } from '@/store/fields.store'
import { defineProps, ref, onBeforeMount } from 'vue'

const { registerField, fields } = useFieldStore()

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: false, default: '' },
  initValue: { type: String, required: false, default: '' },
  validation: { type: Object, required: false, default: () => null },
  nullable: { type: Boolean, required: false, default: false }
})

const value = ref(null)

const clearValue = () => {
  value.value = null
  fields[props.id].value = null
}
const formatDate = () => (value.value ? value.value.toISOString() : null)
const formatValue = (date) => (date.value ? date.value.format('DD/MM/YYYY') : null)

onBeforeMount(() => {
  registerField(props.id, props.initValue, 'date', () => formatDate(), false, props.validation)
  if (props.initValue) {
    const date = dayjs(props.initValue)
    value.value = { id: date.valueOf(), value: date, type: 'date' }
  }
})
</script>
