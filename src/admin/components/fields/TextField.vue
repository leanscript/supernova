<template>
  <div>
    <label :for="props.id" class="block text-sm font-medium text-gray-700 dark:text-white">{{
      props.name
    }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <input
        type="text"
        :name="props.id"
        :id="props.id"
        :placeholder="placeholder"
        v-model="fieldStore.fields[props.id].value"
        autocomplete="off"
        class="form-input flex-grow border-gray-300 dark:bg-slate-900 dark:border-slate-900 rounded-md focus:border-sn-secondary focus:ring-sn-secondary sm:text-sm"
        :disabled="props.disabled"
      />
    </div>
    <p
      class="mt-2 text-xs text-red-600"
      :key="i"
      v-for="(error, i) in fieldStore.fields[id].errors"
    >
      {{ props.name }} {{ error.substr(4) }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { defineProps, computed, onBeforeMount } from 'vue'

const fieldStore = useFieldStore()

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
  placeholder: { type: String, required: false, default: '' },
  initValue: { type: String, required: false, default: '' },
  validation: { type: Object, required: false, default: () => null },
  disabled: { type: Boolean, required: false, default: false }
})

onBeforeMount(() => {
  fieldStore.registerField(props.id, props.initValue || null, 'text', null, false, props.validation)
})
</script>
