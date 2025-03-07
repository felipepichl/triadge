import { Helmet } from 'react-helmet-async'

import { DrawerForm } from '@/components/drawer-form'

export function Stock() {
  return (
    <>
      <Helmet title="Ações e FIIs" />
      <DrawerForm title="Novo Ativo" />
    </>
  )
}
