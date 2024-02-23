import { DraftingCompass, School } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import NavLink from './nav-link'

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <DraftingCompass className="h-5 w-5" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <School className="h-4 w-4" />
            Inicio
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
