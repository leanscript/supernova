<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-700">{{ props.name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="color"
        :name="props.id"
        :id="props.id"
        :placeholder="props.placeholder"
        @change="updateReflectedValue"
        v-model="fieldStore.fields[props.id].value"
        autocomplete="off"
        class="form-input border-gray-300 rounded-md focus:border-mana-blue-500 focus:ring-mana-blue-500 sm:text-sm"
      />
      <div class="h-6 w-6 ml-4 rounded-full mt-1" :style="{ background: reflectedValue }"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { defineProps, onBeforeMount, ref } from 'vue'
const fieldStore = useFieldStore()

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: false, default: '' },
  initValue: { type: String, required: false, default: '#000000' },
  validation: { type: Object, required: false, default: () => null }
})

const reflectedValue = ref(null)

const updateReflectedValue = () => {
  reflectedValue.value = fieldStore.fields[props.id].value
}

onBeforeMount(() => {
  reflectedValue.value = props.initValue
  fieldStore.registerField(props.id, props.initValue, 'color', null, false, props.validation)
})
</script>
