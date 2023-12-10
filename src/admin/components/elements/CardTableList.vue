<template>
  <div class="border rounded-md shadow border-gray-200 bg-white px-4 py-5 sm:px-6 max-h-fit">
    <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
      <div class="ml-4 mt-2">
        <h3 class="text-base font-semibold leading-6 text-gray-900 flex text-mana-blue-700">
          <span class="mr-2">
            <slot />
          </span>
          {{ title }}
        </h3>
      </div>
    </div>
    <table class="min-w-full divide-y divide-gray-300 mt-5">
      <thead>
        <tr>
          <th
            v-for="(column, i) in resources.columns"
            :key="i"
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
            {{ column }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in resources.rows"
          :key="i"
          :class="!row.viewed ? 'border-mana-blue-400' : 'border-transparent'"
          class="hover:bg-gray-100 px-4 border-l-4">
          <td
            v-for="(data, j) in row.data"
            :key="j"
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600">
            <span v-if="typeof data == 'string'">{{ data }}</span>
            <span v-if="typeof data == 'object'">
              <Badge :label="data.label" :accent="data.color" />
            </span>
          </td>
          <td>
            <span class="text-xs mt-1 mr-5 text-gray-500">
              {{ row.viewed ? '' : 'Non lu' }}
            </span>
          </td>
          <td class="whitespace-nowrap py-4 pr-4 mr-10 pr-3 text-sm font-medium sm:pl-0 flex">
            <router-link :to="{ name: detailRoute, params: { id: row.id } }" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 fill-gray-400">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fill-rule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clip-rule="evenodd" />
              </svg>
            </router-link>
          </td>
        </tr>
        <td
          v-if="!resources.rows"
          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-0">
          Aucune donnée
        </td>
      </tbody>
    </table>
    <router-link
      :to="actionRoute"
      class="flex justify-end text-sm cursor-pointer font-semibold mt-4 text-mana-blue-700">
      <p>Tout voir</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CardTableList',
  props: {
    title: { type: String, required: true },
    resources: { type: Object, required: true },
    actionRoute: { type: Object, required: true },
    detailRoute: { type: String, required: true },
  },
}
</script>
