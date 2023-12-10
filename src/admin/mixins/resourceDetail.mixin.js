import { useAdminStore } from '../../store/admin.store'
import { mapState } from 'pinia'
import dayjs from 'dayjs'

const ResourceDetailMixin = {
  computed: {
    ...mapState(useAdminStore, ['resource', 'target']),
  },
  methods: {
    humanDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  },
}

export { ResourceDetailMixin }
