<template>
  <div class="mt-10">
    <div class="space-y-6 mx-auto sm:px-6 lg:col-span-9 lg:px-0">
      <div :class="nested ? '' : 'shadow-md border dark:border-slate-900'" class="sm:rounded-md">
        <div class="space-y-6 dark:bg-slate-800 bg-white py-6 px-4 sm:p-6">
          <slot></slot>
        </div>
        <div class="flex justify-end mx-auto">
          <slot name="form-action"></slot>
          <button
            @click="submitForm"
            type="submit"
            class="rounded-md border border-transparent bg-sn-accent py-2 px-4 text-sm font-medium text-sn-text shadow-sm hover:bg-sn-accent-lighter focus:outline-none focus:ring-2 focus:ring-sn-secondary focus:ring-offset-2 mx-4 my-4">
            {{ saveLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useFieldStore } from '../../../store/fields.store'
import { useAdminStore } from '../../../store/admin.store'
import { mapState } from 'pinia'
import validateData from '../../validator.js';

export default {
  name: 'FormResource',
  mounted() {},
  props: {
    edit: { type: Boolean, required: false, default: false },
    nested: { type: Boolean, required: false, default: false },
    saveLabel: { type: String, required: false, default: 'Sauvegarder' },
    redirectToIndex: { type: Boolean, required: false, default: false },
  },
  data() {
    return {
      reflectedValues: {},
    }
  },
  computed: {
    ...mapState(useFieldStore, ['fields']),
    ...mapState(useAdminStore, ['resource', 'target']),
  },
  methods: {
    async submitForm() {

      const output = await Promise.all(
        Object.keys(this.fields).map(async (el) => {
          const target = this.fields[el]
          let value = null
          if (target.callback !== null) value = target.callback()
          else if (target.callback && target.async) value = await target.callback()
          else value = target.value
          return { id: el, type: target.type, value: await value }
        }),
      )

      const toValidation = output.map(field => {
        if(this.fields[field.id]) {
          return { ...field, validation: this.fields[field.id].validation }
        }
      });

      const errors = validateData(toValidation)

      Object.entries(errors).forEach((el) => {
        this.fields[el[0]].errors = el[1].errors
      })

      if(Object.keys(errors).length) return

      if (this.edit) {
        try {
        const id = this.resource[this.$admin.primaryKey]
        await this.$admin.editOne(this.target, id, output)
        this.$layout.openToast({
          title: 'Resource mise à jour avec succès',
          type: 'success',
        })

        if (!this.nested) {
          if(!this.redirectToIndex) {
            this.$router.push({
              name: `${this.target}_detail`,
              params: { id: this.resource.id },
            })
          } else {
            this.$router.push({
              name: `${this.target}_index`,
            })
          }
        } else {
          this.$emit('form_success')
        }
        } catch(e) {
          const { status, statusText} = e.response
          this.$layout.openToast({
            title: 'Une erreur est survenue',
            subtitle: `${statusText} (${status})`,
            type: 'error'
          })
        }
      } else {
        try {
          let data = output
          if(this.$fields.formSerializer) {
            data = this.$fields.formSerializer(output)
          }
          await this.$admin.addOne(this.target, data)
          this.$layout.openToast({
            title: 'Ressource créée avec succès',
            type: 'succès',
          })

          if (!this.nested) {
            this.$router.push({ name: `${this.target}_index` })
          } else {
            this.$emit('form_success')
          }
        } catch(e) {
          const { status, statusText, data} = e.response
          this.$layout.openToast({
            title: 'Une erreur est survenue',
            subtitle: `${statusText} (${status})`,
            type: 'error'
          })
          let errors = this.$fields.errorParser(data)
          console.log(errors)
          Object.entries(errors).forEach((el) => {
            this.fields[el[0]].errors = el[1].errors
          })
        }
      }
    },
  },
}
</script>
