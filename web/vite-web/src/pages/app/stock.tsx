import { Helmet } from 'react-helmet-async'

import { NewAsset } from '@/components/new-asset/new-asset'

export function Stock() {
  return (
    <>
      <Helmet title="Ações e FIIs" />
      <NewAsset />
    </>
  )
}
