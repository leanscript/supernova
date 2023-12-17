<template>
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        class="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
      >
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>

          <input
            type="text"
            v-focus
            v-model="search"
            class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Rechercher sur Supernova"
            role="combobox"
            aria-expanded="false"
            aria-controls="options"
          />
        </div>
        <div
          v-if="!search.length"
          class="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mx-auto h-6 w-6 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>

          <p class="mt-4 font-semibold text-gray-900">Rechercher parmis les resources</p>
          <p class="mt-2 text-gray-500">
            Accédez rapidement aux resources en effectuant une recherche globale.
          </p>
        </div>
        <ul
          class="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
          id="options"
          role="listbox"
        >
          <li v-if="users.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Employés</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'users_detail',
                  params: { id: user.id }
                }"
                v-for="(user, i) in users"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
                id="option-1"
                role="option"
                tabindex="-1"
                >{{ user.firstname }} {{ user.lastname }}</router-link
              >
            </ul>
          </li>
          <li v-if="assets.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Resources</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'assets_index',
                  query: {
                    asset_category: asset.asset_category_id,
                    asset_subcategory: asset.asset_subcategory_id,
                    asset: asset.id
                  }
                }"
                v-for="(asset, i) in assets"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
              >
                {{ asset.asset_category }} > {{ asset.asset_subcategory }} >
                {{ asset.name }}
              </router-link>
            </ul>
          </li>
          <li v-if="projects.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Projets</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'projects_detail',
                  params: { id: project.id }
                }"
                v-for="(project, i) in projects"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
              >
                <div
                  class="h-3 w-3 mr-2 mt-1 rounded-full"
                  :style="{ background: project.color }"
                ></div>
                {{ project.name }}
              </router-link>
            </ul>
          </li>
          <li v-if="promotions.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Promotions</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'promotions_detail',
                  params: { id: promotion.id }
                }"
                v-for="(promotion, i) in promotions"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
              >
                <div
                  class="h-3 w-3 mr-2 mt-1 rounded-full"
                  :style="{ background: promotion.color }"
                ></div>
                {{ promotion.name }}
              </router-link>
            </ul>
          </li>
          <li v-if="skills.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Compétences</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'skills_detail',
                  params: { id: skill.id }
                }"
                v-for="(skill, i) in skills"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer"
              >
                {{ skill.name }} | {{ skill.type_label }}
              </router-link>
            </ul>
          </li>
        </ul>
        <div
          v-if="noResults"
          class="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="mx-auto h-6 w-6 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z"
              clip-rule="evenodd"
            />
          </svg>

          <p class="mt-4 font-semibold text-gray-900">Aucun résultat pour la recherche</p>
          <p class="mt-2 text-gray-500">
            Nous n'avons rien trouvé qui corresponde à ce terme. Veuillez réessayer.
          </p>
        </div>
        <button
          class="w-full border-t py-2 hover:bg-gray-100 text-gray-800 hover:text-text-gray-900"
          @click="$emit('closePalette')"
        >
          Fermer la recherche
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject, computed } from 'vue'

const $admin = inject('$admin')

const users = ref([])
const projects = ref([])
const promotions = ref([])
const assets = ref([])
const skills = ref([])
const search = ref('')

const noResults = computed(() => {
  return (
    !users.value.length &&
    !projects.value.length &&
    !promotions.value.length &&
    !assets.value.length &&
    !skills.value.length &&
    search.value.length > 2
  )
})

watch(search, async (newVal) => {
  if (newVal.length >= 2) {
    users.value = await $admin.search('users', search.value)
    projects.value = await $admin.search('groups', search.value, 'type = project')
    promotions.value = await $admin.search('groups', search.value, 'type = promotion')
    assets.value = await $admin.search('assets', search.value)
    skills.value = await $admin.search('skills', search.value)
  }
  if (newVal === '') {
    users.value = []
    projects.value = []
    promotions.value = []
    assets.value = []
    skills.value = []
  }
})
</script>
