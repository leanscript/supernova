<template>
  <tr
    class="focus:outline-none border border-gray-100 cursor-pointer rounded hover:bg-sn-transparent transition">
    <td v-if="selectable" @click="selectLine">
      <div class="ml-5">
        <div
          class="bg-gray-200 rounded-sm w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
          <input
            class="w-3 h-3"
            type="checkbox"
            :name="`item_${id}`"
            :value="isSelected"
            :checked="isSelected" />
        </div>
      </div>
    </td>
    <td v-else></td>
    <slot />
    <td class="pl-4 flex justify-center my-2">
      <router-link v-if="!relation && detailBtn" :to="itemDetails" class="font-bold detail-btn">
        <EyeIcon class="font-bold fill-gray-400 hover:fill-sn-secondary w-6 h-6 mx-1" />
        <div class="relative">
          <div
            style="margin-left: -2.2rem"
            class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full -mt-6 detail-btn-tooltip hidden transition duration-150 ease-out">
            <div class="relative shadow-md">
              <div class="bg-sn-secondary -mt-8 text-white truncate text-xs rounded py-2 px-4">
                Voir le détail
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <router-link v-if="editBtn" :to="itemEdit" class="font-bold edit-btn">
        <Cog8ToothIcon class="font-bold fill-gray-400 hover:fill-sn-secondary w-6 h-6 mx-1" />
        <div class="relative">
          <div
            style="margin-left: -2.2rem"
            class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full -mt-6 edit-btn-tooltip hidden transition duration-150 ease-out">
            <div class="relative shadow-md">
              <div class="bg-sn-secondary -mt-8 text-white truncate text-xs rounded py-2 px-4">
                Modifier
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <TrashIcon
        v-if="deleteBtn"
        @click="openDeleteModale(itemData)"
        class="font-bold fill-gray-400 hover:fill-red-500 w-6 h-6 mx-1" />

      <button
        v-if="quickViewBtn"
        @click="openQuickViewIsOpen(itemData)"
        class="flex font-medium ml-2 mr-2 text-gray-500">
        <BoltIcon class="font-bold fill-gray-400 w-6 h-6 mx-1" />
        <span class="mt-1">Aperçu</span>
      </button>
    </td>
  </tr>
</template>
<script setup>
import { EyeIcon, Cog8ToothIcon, TrashIcon, BoltIcon } from '@heroicons/vue/24/solid'
</script>
<script>
import { useAdminStore } from '../../../store/admin.store'
import { useLayoutStore } from '../../../store/layout.store'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'TableItem',
  props: {
    id: { type: String, required: true },
    deleteBtn: { type: Boolean, required: false, default: false },
    editBtn: { type: Boolean, required: false, default: false },
    quickViewBtn: { type: Boolean, required: false, default: false },
    detailBtn: { type: Boolean, required: false, default: true },
    relation: { type: Boolean, required: false, default: false },
    selectable: { type: Boolean, required: false, default: true },
  },
  data() {
    return {
      dropdownIsOpen: false,
      hover: false,
    }
  },
  computed: {
    ...mapState(useAdminStore, {
      resource: 'resource',
      resources: 'resources',
      selected: 'selected',
      target: 'target',
    }),
    ...mapState(useLayoutStore, ['deleteModaleIsOpen']),
    isSelected() {
      return this.selected.find((el) => el === this.id)
    },
    itemDetails() {
      return { name: `${this.target}_detail`, params: { id: this.id } }
    },
    itemEdit() {
      return { name: `${this.target}_edit`, params: { id: this.id } }
    },
    itemData() {
      return this.resources.find((el) => el[this.$admin.primaryKey] === this.id)
    },
  },
  methods: {
    ...mapActions(useAdminStore, ['toggleSelected']),
    ...mapActions(useLayoutStore, ['openDeleteModale', 'openQuickViewIsOpen']),
    selectLine() {
      this.toggleSelected(this.target, this.id)
    },
  },
}
</script>
