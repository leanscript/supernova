import { defineStore } from 'pinia'

export const useFieldStore = defineStore('fieldStore', {
  state: () => ({ fields: {} }),
  actions: {
    async registerField(name, value, type, callback = null, async = false, validation = null) {
      this.fields[name] = { value, type, callback, async, validation }
    },
  },
})
