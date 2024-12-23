import { Helmet } from 'react-helmet-async'

import { NewTransaction } from '@/components/new-transaction/new-tranaction'

export function AccountPayable() {
  return (
    <>
      <Helmet title="Contas a Pagar" />
      <NewTransaction title="Nova Conta a Pagar" type="accountPayable" />
    </>
  )
}
