<template>
  <tr
    class="focus:outline-none border border-gray-100 dark:border-slate-900 cursor-pointer rounded hover:bg-sn-transparent transition"
  >
    <td v-if="props.selectable" @click="selectLine">
      <div class="ml-5">
        <div
          class="bg-gray-200 rounded-sm w-3 h-3 flex flex-shrink-0 justify-center items-center relative"
        >
          <input
            class="w-3 h-3"
            type="checkbox"
            :name="`item_${props.id}`"
            :value="isSelected"
            :checked="isSelected"
          />
        </div>
      </div>
    </td>
    <td v-else></td>
    <slot />
    <td class="pl-4 flex justify-center my-2">
      <router-link
        v-if="!props.relation && props.detailBtn"
        :to="itemDetails"
        class="font-bold detail-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="font-bold fill-gray-400 hover:fill-sn-accent w-6 h-6 mx-1"
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path
            fill-rule="evenodd"
            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="relative">
          <div
            style="margin-left: -2.2rem"
            class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full -mt-6 detail-btn-tooltip hidden transition duration-150 ease-out"
          >
            <div class="relative shadow-md">
              <div
                class="bg-sn-secondary border-1 -mt-8 text-sn-text truncate text-xs rounded-md py-2 px-4"
              >
                Voir le détail
              </div>
            </div>
          </div>
        </div>
      </router-link>

      <router-link v-if="props.editBtn" :to="itemEdit" class="font-bold edit-btn">
        <svg
          class="font-bold fill-gray-400 hover:fill-sn-accent w-6 h-6 mx-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            clip-rule="evenodd"
          />
        </svg>

        <div class="relative">
          <div
            style="margin-left: -2.2rem"
            class="absolute z-40 opacity-100 bottom-100 mb-2 left-0 min-w-full -mt-6 edit-btn-tooltip hidden transition duration-150 ease-out"
          >
            <div class="relative shadow-md">
              <div
                class="bg-sn-secondary border-1 -mt-8 text-sn-text truncate text-xs rounded-md py-2 px-4"
              >
                Modifier
              </div>
            </div>
          </div>
        </div>
      </router-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        v-if="props.deleteBtn"
        @click="openDeleteModale(itemData)"
        class="font-bold fill-gray-400 hover:fill-red-500 w-6 h-6 mx-1"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
          clip-rule="evenodd"
        />
      </svg>
      <button
        v-if="props.quickViewBtn"
        @click="openQuickViewIsOpen(itemData)"
        class="flex font-medium ml-2 mr-2 text-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="font-bold fill-gray-400 w-6 h-6 mx-1"
        >
          <path
            fill-rule="evenodd"
            d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="mt-1">Aperçu</span>
      </button>
    </td>
  </tr>
</template>
<script lang="ts" setup>
import { useAdminStore } from '@/store/admin.store'
import { useLayoutStore } from '@/store/layout.store'
import { defineProps, ref, computed, inject } from 'vue'

const $admin = inject('$admin')

const props = defineProps({
  id: { type: String, required: true },
  deleteBtn: { type: Boolean, required: false, default: false },
  editBtn: { type: Boolean, required: false, default: false },
  quickViewBtn: { type: Boolean, required: false, default: false },
  detailBtn: { type: Boolean, required: false, default: true },
  relation: { type: Boolean, required: false, default: false },
  selectable: { type: Boolean, required: false, default: true }
})

const dropdownIsOpen = ref(false)
const hover = ref(false)

const { resource, resources, selected, target, toggleSelected } = useAdminStore()
const { deleteModaleIsOpen, openDeleteModale, openQuickViewIsOpen } = useLayoutStore()

const isSelected = computed(() => selected.find((el) => el === props.id))
const itemDetails = computed(() => ({ name: `${target}_detail`, params: { id: props.id } }))
const itemEdit = computed(() => ({ name: `${target}_edit`, params: { id: props.id } }))
const itemData = computed(() => resources.find((el) => el[$admin.primaryKey] === props.id))

const selectLine = () => toggleSelected(target, props.id)
</script>
