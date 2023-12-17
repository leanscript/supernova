<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-700">{{ props.name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="props.id"
        :id="props.id"
        :value="props.displayValue"
        autocomplete="off"
        class="form-input flex-grow border-gray-300 rounded-md focus:border-mana-blue-500 focus:ring-mana-blue-500 sm:text-sm bg-gray-200 cursor-none"
        disabled
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { ref, defineProps, onBeforeMount } from 'vue'

const { registerField, fields } = useFieldStore()

const value = ref(null)
const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: false, default: '' },
  initValue: { type: String, required: false, default: '' },
  displayValue: { type: String, required: true },
  validation: { type: Object, required: false, default: () => null }
})

onBeforeMount(() => {
  registerField(props.id, props.initValue, 'text', null, false, props.validation)
  if (props.initValue) value.value = props.initValue
})
</script>
