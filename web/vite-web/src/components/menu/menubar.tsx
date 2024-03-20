import { MenuSquare, School, Wallet } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomNavlink } from './custom-nav-link'

export function Manubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleMenu() {
    setIsMenuOpen((prevState) => !prevState)
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={handleToggleMenu}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuSquare className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-50"
        onClick={handleToggleMenu}
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
