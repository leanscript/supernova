import { defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    target: null,
    resources: [],
    resource: null,
    pagination: {},
    selected: [],
    query: {},
    _filters: {},
    _sort: {},
    filtersDict: []
  }),
  actions: {
    setTarget(resource) {
      this.target = resource
    },

    reset() {
      this.query = {}
      this._filters = {}
      this._sort = {}
      this.resources = []
      this.resource = null
      this.selected = []
    },

    resetSelected() {
      this.selected = []
    },

    registerFiltersDict(dict) {
      this.filtersDict = [...dict, ...this.filtersDict]
    },

    async getMany(resource, axios, page = 1, perPage = 14) {
      this.target = resource

      let qs = ''

      if (this.query.filter || this.query.sort) {
        if (this.query.filter.length > 0 || this.query.sort.length > 0) {
          qs = '&' + Object.values(this.query).join('&')
        }
      }

      const res = await axios.get(`/${this.target}?page=${page}${qs}&perPage=${perPage}`)

      this.resources = res.data.data
      this.pagination = res.data.meta
    },

    async getOne(resource, id, axios, include = null, query = null) {
      this.target = resource
      let endpoint = `/${this.target}/${id}`

      if (include) {
        endpoint = `${endpoint}?with=${include}`
      }

      if (query) {
        endpoint = `${endpoint}&${query}`
      }

      const res = await axios.get(endpoint)
      this.resource = res.data.data
    },

    async setSorting(sort) {
      sort.direction = sort.direction === -1 ? '-' : ''
      this.query['sort'] = `sort=${sort.direction}${sort.key}`
    },

    async setFilters(filters) {
      let queryString = []
      this._filters = { ...this._filters, ...filters }
      Object.entries(this._filters).forEach((el) => {
        queryString.push(`filter[${el[0]}]=${el[1].join(',')}`)
      })
      queryString = queryString.join('&')
      this.query['filter'] = queryString
    },

    removeFilter(filter) {
      const { key, value } = filter

      this._filters[key].splice(this._filters[key].indexOf(value), 1)

      let queryString = []
      Object.entries(this._filters).forEach((el) => {
        if (el[1].length > 0) {
          queryString.push(`filter[${el[0]}]=${el[1].join(',')}`)
        }
      })
      queryString = queryString.join('&')
      this.query['filter'] = queryString
    },

    async addOne(resource, data, axios) {
      this.target = resource
      return await axios.post(`/${this.target}`, data)
    },
    async editOne(resource, id, data, bypass, axios) {
      this.target = resource
      if (bypass) {
        return await axios.patch(`/${this.target}/${id}?bypass=true`, data)
      } else {
        return await axios.patch(`/${this.target}/${id}`, data)
      }
    },
    async toggleSelected(resource, newSelected) {
      this.target = resource

      if (this.selected.find((el) => el === newSelected)) {
        this.selected.splice(this.selected.indexOf(newSelected), 1)
      } else {
        this.selected.push(newSelected)
      }
    }
  }
})
