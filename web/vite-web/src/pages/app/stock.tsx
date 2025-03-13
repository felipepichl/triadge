import { Helmet } from 'react-helmet-async'

import { NewStock } from '@/components/new-stock/new-stock'

export function Stock() {
  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewStock />
    </>
  )
}
