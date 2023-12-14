<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-700">{{ props.name }}</label>
    <div class="relative mt-4 rounded-md border h-10 p-1 bg-gray-200 w-1/3">
      <div class="relative w-full h-full flex items-center">
        <div
          @click="selected = !selected"
          class="w-full flex justify-center text-gray-400 cursor-pointer"
        >
          <button>Oui</button>
        </div>
        <div
          @click="selected = !selected"
          class="w-full flex justify-center text-gray-400 cursor-pointer"
        >
          <button>Non</button>
        </div>
      </div>
      <span
        :class="{ 'left-1/2 -ml-1': !selected, 'left-1': selected }"
        class="bg-white shadow text-sm flex font-semibold items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute"
      >
        {{ selected ? 'Oui' : 'Non' }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { defineProps, ref, onBeforeMount } from 'vue'

const fieldStore = useFieldStore()

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: false, default: '' },
  initValue: { type: [String, Boolean], required: false, default: '' },
  validation: { type: Object, required: false, default: () => null }
})

const selected = ref(false)

onBeforeMount(() => {
  selected.value = props.initValue
  fieldStore.registerField(
    props.id,
    props.initValue,
    'boolean',
    () => (selected.value ? true : false),
    false,
    props.validation
  )
})
</script>
