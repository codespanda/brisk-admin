import { getCustomers } from '@/services/customer.service'
import { CustomersPageClient } from '@/features/customers/components/customers-page-client'

export default async function CustomersPage() {
  const customers = await getCustomers()

  return <CustomersPageClient customers={customers} />
}
