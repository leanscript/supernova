<template>
  <div></div>
</template>

<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'HiddenField',
  field: true,
  props: {
    id: { type: String, required: true },
    initValue: { type: String, required: false, default: '' },
  },
  data() {
    return {
      value: null,
    }
  },
  methods: {
    ...mapActions(useFieldStore, ['registerField']),
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.value = this.initValue
    this.registerField(this.id, this.initValue, 'hidden', () => this.value, false)
  },
}
</script>
