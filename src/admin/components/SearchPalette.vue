<template>
  <div class="relative z-10" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        class="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
        <div class="relative">
          <MagnifyingGlassIcon
            class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            v-focus
            v-model="search"
            class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Rechercher sur Supernova"
            role="combobox"
            aria-expanded="false"
            aria-controls="options" />
        </div>
        <div
          v-if="!search.length"
          class="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
          <MagnifyingGlassIcon class="mx-auto h-6 w-6 text-gray-400" />
          <p class="mt-4 font-semibold text-gray-900">Rechercher parmis les resources</p>
          <p class="mt-2 text-gray-500">
            Accédez rapidement aux resources en effectuant une recherche globale.
          </p>
        </div>
        <ul
          class="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
          id="options"
          role="listbox">
          <li v-if="users.length">
            <h2 class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">Employés</h2>
            <ul class="mt-2 text-sm text-gray-800">
              <router-link
                :to="{
                  name: 'users_detail',
                  params: { id: user.id },
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
                    asset: asset.id,
                  },
                }"
                v-for="(asset, i) in assets"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer">
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
                  params: { id: project.id },
                }"
                v-for="(project, i) in projects"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer">
                <div
                  class="h-3 w-3 mr-2 mt-1 rounded-full"
                  :style="{ background: project.color }"></div>
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
                  params: { id: promotion.id },
                }"
                v-for="(promotion, i) in promotions"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer">
                <div
                  class="h-3 w-3 mr-2 mt-1 rounded-full"
                  :style="{ background: promotion.color }"></div>
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
                  params: { id: skill.id },
                }"
                v-for="(skill, i) in skills"
                :key="i"
                class="flex select-none px-4 py-2 hover:bg-gray-200 transition-all cursor-pointer">
                {{ skill.name }} | {{ skill.type_label }}
              </router-link>
            </ul>
          </li>
        </ul>
        <div
          v-if="noResults"
          class="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14">
          <FaceFrownIcon class="mx-auto h-6 w-6 text-gray-400" />
          <p class="mt-4 font-semibold text-gray-900">Aucun résultat pour la recherche</p>
          <p class="mt-2 text-gray-500">
            Nous n'avons rien trouvé qui corresponde à ce terme. Veuillez réessayer.
          </p>
        </div>
        <button
          class="w-full border-t py-2 hover:bg-gray-100 text-gray-800 hover:text-text-gray-900"
          @click="$emit('closePalette')">
          Fermer la recherche
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon, FaceFrownIcon } from '@heroicons/vue/24/solid'
</script>
<script>
export default {
  data() {
    return {
      users: [],
      projects: [],
      promotions: [],
      assets: [],
      skills: [],
      search: '',
    }
  },
  watch: {
    async search(newVal) {
      if (newVal.length >= 2) {
        this.users = await this.$admin.search('users', this.search)
        this.projects = await this.$admin.search('groups', this.search, 'type = project')
        this.promotions = await this.$admin.search('groups', this.search, 'type = promotion')
        this.assets = await this.$admin.search('assets', this.search)
        this.skills = await this.$admin.search('skills', this.search)
      }
      if (newVal === '') {
        this.users = []
        this.projects = []
        this.promotions = []
        this.assets = []
        this.skills = []
      }
    },
  },
  computed: {
    noResults() {
      return (
        !this.users.length &&
        !this.projects.length &&
        !this.promotions.length &&
        !this.assets.length &&
        !this.skills.length &&
        this.search.length > 2
      )
    },
  },
}
</script>
