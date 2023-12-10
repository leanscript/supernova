<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div :id="id" class="border rounded-md py-3 px-4 mt-1"></div>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image'
import { useFieldStore } from '../../../store/fields.store'
import { mapActions } from 'pinia'

export default {
  name: 'EditorField',
  field: true,
  async: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true, default: 'editorjs' },
    initValue: { type: Object, required: false, default: () => {} },
  },
  data() {
    return {
      editor: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  async mounted() {
    this.editor = new EditorJS({
      holder: this.id,
      data: this.initValue || {},
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
              byUrl: 'http://localhost:4000/resources/public/image',
            },
          },
        },
      },
      placeholder: 'Commencez à rédiger ...',
    })

    this.registerField(this.id, this.editor, 'editor', () => this.editor.save(), true)
  },
}
</script>
<style>
.ce-block__content,
.ce-toolbar__content {
  max-width: 50%;
  border: 0;
}
</style>
