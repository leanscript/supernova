<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8 bg-white">
      <div class="sm:flex sm:items-center">
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
      </div>
      <div class="flex w-full justify-end">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h1>
          <p class="mt-2 text-sm text-gray-700" v-if="subtitle">
            {{ subtitle }}
          </p>
        </div>
        <slot name="table-actions" />
      </div>
      <div class="mt-4 grid grid-cols-2">
        <div class="">
          <slot name="header-search" />
        </div>
        <div class="flex justify-end">
          <slot name="header-actions" />
        </div>
      </div>
      <FiltersList />
    </div>
    <div>
      <div class="-mx-4 mt-4 border ring-1 ring-black ring-opacity-5 rounded sm:-mx-6 md:mx-0">
        <table class="min-w-full">
          <thead class="resource-table-header text-md my-4">
            <tr>
              <th scope="col"></th>
              <slot name="table-head" />
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <slot name="table-body" />
          </tbody>
        </table>
      </div>
    </div>
    <QuickView :title="title" v-if="quickViewIsOpen" />
    <div
      v-if="deleteModaleIsOpen"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mana-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-mana-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  Supprimer une resource
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Voulez-vous vraiment supprimer la resource
                    <span class="font-bold">"{{ deleteModaleData[displayLabel] }}"</span>
                    ?
                    <br />
                    <br />
                    Toutes les données associées seront définitivement supprimées de nos serveurs
                    pour toujours. Cette action ne peut pas être annulée.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                @click="deleteItem"
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-mana-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mana-red-500 sm:ml-3 sm:w-auto"
              >
                Confimer la suppression
              </button>
              <button
                @click="closeDeleteModale"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!resources.length">
      <EmptyImage class="w-1/2 mx-auto h-64 mt-4" />
      <p class="font-bold text-gray-500 text-center my-4">C'est bien vide ici !</p>
    </div>
    <Pagination />
  </div>
</template>
<script lang="ts" setup>
import { useLayoutStore } from '@/store/layout.store'
import { useAdminStore } from '@/store/admin.store'
import { computed, defineProps, define } from 'vue'

const $admin = inject('$admin')
const $layout = inject('$layout')

const {
  deleteModaleIsOpen,
  quickViewIsOpen,
  deleteModaleData,
  closeDeleteModale,
  closeQuickViewIsOpen
} = useLayoutStore()

const { target, resources } = useAdminStore()

const { displayLabel, title, subtitle } = defineProps({
  displayLabel: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: false, default: null }
})

const deleteItem = () => {
  $admin.deleteOne(this.target, this.deleteModaleData.id)
  $admin.getManyResources(this.target)
  closeDeleteModale()
  $layout.openToast({
    title: 'Resource supprimée avec succès',
    type: 'error'
  })
}
</script>
