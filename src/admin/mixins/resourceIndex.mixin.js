import { useAdminStore } from '../../store/admin.store'
import { mapState } from 'pinia'
import dayjs from 'dayjs'

const ResourceIndexMixin = {
  computed: {
    ...mapState(useAdminStore, ['resources', 'pagination', 'target']),
  },
  methods: {
    humanDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  },
}

export { ResourceIndexMixin }
