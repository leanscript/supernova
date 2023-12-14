import dayjs from 'dayjs'
import { useAdminStore } from '@/store/admin.store'

export function ResourceIndexComp() {
  const humanDate = (date) => dayjs(date).format('DD/MM/YYYY')
  const adminStore = useAdminStore()

  const { resources, pagination, target } = adminStore

  return { resources, pagination, target, humanDate }
}
