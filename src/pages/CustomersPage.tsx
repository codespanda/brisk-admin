import { useEffect, useState } from 'react'
import { getCustomers } from '@/services/customer.service'
import { CustomersPageClient } from '@/features/customers/components/customers-page-client'
import type { Customer } from '@/types'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    getCustomers().then(setCustomers)
  }, [])

  return <CustomersPageClient customers={customers} />
}
