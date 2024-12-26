import { Helmet } from 'react-helmet-async'

import { NewTransactionAccount } from '@/components/new-transaction-account/new-tranaction-account'

export function AccountPayable() {
  return (
    <>
      <Helmet title="Contas a Pagar" />
      <NewTransactionAccount title="Nova Conta a Pagar" type="accountPayable" />
    </>
  )
}
