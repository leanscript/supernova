<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ props.name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <RangePicker v-model="value" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { RangePicker } from '@leanscript/vtc'
import { defineProps, ref, computed, watch, onBeforeMount } from 'vue'
import dayjs from 'dayjs'

const { registerField, fields } = useFieldStore()
const value = ref({ first: {}, last: {} })
const showPicker = ref(false)
const displayValue = ref(null)

const props = defineProps({
  name: { type: String, required: true },
  startId: { type: String, required: true },
  endId: { type: String, required: true },
  initStartDate: { type: String, required: false, default: '' },
  initEndDate: { type: String, required: false, default: '' },
  validation: { type: Object, required: false, default: () => null }
})

const formatDate = (date) => (date ? date.value.toISOString() : null)

watch(value, (newVal) => {
  if (newVal.first && newVal.last) {
    let displayValue = dayjs(value.value.first).format('DD/MM/YYYY')
    displayValue.value = `${displayValue} - ${dayjs(value.value.last).format('DD/MM/YYYY')}`
  }
  showPicker.value = false
})

onBeforeMount(() => {
  registerField(
    props.startId,
    props.initStartDate,
    'date',
    () => formatDate(value.value.first),
    false,
    props.validation
  )
  registerField(
    props.endId,
    props.initEndDate,
    'date',
    () => formatDate(value.value.last),
    false,
    props.validation
  )

  if (props.initStartDate) {
    const date = dayjs(props.initStartDate)
    value.value.first = { id: date.valueOf(), value: date, type: 'date' }
  }

  if (props.initEndDate) {
    const date = dayjs(props.initEndDate)
    value.value.last = { id: date.valueOf(), value: date, type: 'date' }
  }
})
</script>
