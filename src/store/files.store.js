import { defineStore } from 'pinia'

export const useFilesStore = defineStore('filesStore', {
  state: () => ({ selectedFile: null }),
  actions: {
    async selectFile(file) {
      if (file.type !== 'dir') {
        this.selectedFile = file
      }
    },
  },
})
