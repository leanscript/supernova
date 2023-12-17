<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div :id="id" class="border rounded-md py-3 px-4 mt-1"></div>
  </div>
</template>
<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import { useFieldStore } from '@/store/fields.store'
import { ref, defineProps, onMounted } from 'vue'

const { registerField } = useFieldStore()
const editor = ref(null)
const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true, default: 'editorjs' },
  initValue: { type: Object, required: false, default: () => {} }
})
onMounted(() => {
  editor.value = new EditorJS({
    holder: props.id,
    data: props.initValue || {},
    tools: {
      header: Header,
      list: List,
      table: Table,
      embed: Embed,
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: 'http://localhost:4000/resources/public/image',
            byUrl: 'http://localhost:4000/resources/public/image'
          }
        }
      }
    },
    placeholder: 'Commencez à rédiger ...'
  })

  registerField(props.id, editor.value, 'editor', () => editor.value.save(), true)
})
</script>

<style>
.ce-block__content,
.ce-toolbar__content {
  max-width: 50%;
  border: 0;
}
</style>
