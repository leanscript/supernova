<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ name }}</label>
    <div class="mt-1 flex rounded-md shadow-sm">
      <DatePicker
        color="custom"
        v-click-outside="closeCalendar"
        v-model="value"
        class="w-full"
        style="margin-top: 40px; position: absolute !important"
        v-if="showPicker" />
      <input
        @click="showPicker = !showPicker"
        class="form-input w-full flex flex-grow border-gray-300 rounded-md focus:border-sn-primary focus:ring-sn-primary sm:text-sm"
        :placeholder="placeholder"
        :value="displayValue" />
      <button
        v-if="nullable"
        @click="clearValue"
        type="button"
        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 fill-gray-500">
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
  import { DatePicker } from 'v-calendar'
</script>
<script>
import { useFieldStore } from '../../../store/fields.store'
import { mapState, mapActions } from 'pinia'
import dayjs from 'dayjs'

import 'v-calendar/style.css'

export default {
  name: 'DateField',
  field: true,
  props: {
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String, required: false, default: '' },
    initValue: { type: String, required: false, default: '' },
    validation: { type: Object, required: false, default: () => null },
    nullable: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      value: null,
      displayValue: null,
      showPicker: false,
    }
  },
  methods: {
    clearValue() {
      this.value = null
      this.displayValue = null
      this.showPicker = false
      this.fields[this.id].value = null
    },
    ...mapActions(useFieldStore, ['registerField']),
    closeCalendar() {
      this.showPicker = false
    },
    formatDate() {
      if (this.value) {
        return dayjs(this.value).unix()
      }
      return null
    },
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.displayValue = dayjs(this.value).format('DD/MM/YYYY')
      }
      this.showPicker = false
    },
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
  },
  created() {
    this.registerField(
      this.id,
      this.initValue,
      'date',
      () => this.formatDate(),
      false,
      this.validation,
    )
    if (this.initValue) this.value = this.initValue
  },
}
</script>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  border: 1px solid rgb(209 213 219);
  padding-top: 2px;
  margin-bottom: 4px !important;
  color: #6b7280;
  @apply text-sm;
}

.vc-container {
  margin-top: -270px !important;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
.vc-custom {
  --vc-accent-50:  var(--sn-primary);
  --vc-accent-100: var(--sn-primary);
  --vc-accent-200: var(--sn-primary);
  --vc-accent-300: var(--sn-primary);
  --vc-accent-400: var(--sn-primary);
  --vc-accent-500: var(--sn-primary);
  --vc-accent-600: var(--sn-primary);
  --vc-accent-700: var(--sn-primary);
  --vc-accent-800: var(--sn-primary);
  --vc-accent-900: var(--sn-primary);
}
</style>
