<template>
  <div></div>
</template>
<script lang="ts" setup>
import { useFieldStore } from '@/store/fields.store'
import { ref, defineProps, onBeforeMount } from 'vue'

const fieldStore = useFieldStore()

const value = ref(null)
const props = defineProps({
  id: { type: String, required: true },
  initValue: { type: String, required: false, default: '' }
})

onBeforeMount(() => {
  value.value = props.initValue
  fieldStore.registerField(props.id, props.initValue, 'hidden', () => value.value, false)
})
</script>
