import { MenuSquare, School, Wallet } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomNavlink } from './custom-nav-link'

export function ResponsiveMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="lg:hidden" variant="outline" size="icon">
          <MenuSquare className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-50">
        <DropdownMenuItem>
          <CustomNavlink to="/" icon={School} description="Início" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomNavlink to="/finances" icon={Wallet} description="Finanças" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
