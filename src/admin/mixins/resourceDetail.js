import dayjs from 'dayjs'
import { useAdminStore } from '../../store/admin.store'

export function ResourceDetailComp() {
  const humanDate = (date) => (dayjs(date).format('DD/MM/YYYY'))
  const adminStore = useAdminStore()

  const { resource, target } = adminStore

  return { resource, pagination, target }
}
