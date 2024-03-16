import { MenuSquare, School, Wallet } from 'lucide-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomNavlink } from './custom-nav-link'
import { useMenu } from './menubar-provider'

export function Manubar() {
  const { isMenuOpen, toggleMenu } = useMenu()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={toggleMenu}>
          <MenuSquare className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={`w-50 ${isMenuOpen ? 'hidden' : ''}`}
        // className="w-50"
      >
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
