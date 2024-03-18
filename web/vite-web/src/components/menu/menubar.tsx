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

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  return (
    <DropdownMenu open={isMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" onClick={toggleMenu}>
          <MenuSquare className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-50">
        <DropdownMenuItem>
          <CustomNavlink
            to="/"
            icon={School}
            description="Início"
            onClick={toggleMenu}
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomNavlink
            to="/finances"
            icon={Wallet}
            description="Finanças"
            onClick={toggleMenu}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
