import { MenuSquare, School, Wallet } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomNavlink } from './custom-nav-link'

export function ResponsiveMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="lg:hidden">
          <MenuSquare className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-50">
        <CustomNavlink to="/" icon={School} description="Início" />
        <CustomNavlink to="/finances" icon={Wallet} description="Finanças" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
