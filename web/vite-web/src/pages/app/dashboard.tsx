import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="mb-4 flex gap-4 lg:pt-10">
        <Input className="flex-1" />
        <Button className="w-40 min-w-40">Pesquisar</Button>
      </div>
    </>
  )
}
