import {
  ArrowLeftRight,
  LogOut,
  MenuSquare,
  ScanBarcode,
  School,
} from 'lucide-react'
import { useState } from 'react'

import { useAuth } from '@/hooks/use-auth'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomNavlink } from './custom-nav-link'

export function Manubar() {
  const { signOut } = useAuth()
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
          <CustomNavlink
            to="/finances"
            icon={ArrowLeftRight}
            description="Transações"
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CustomNavlink
            to="/account-payable"
            icon={ScanBarcode}
            description="Contas a Pagar"
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className="flex items-center space-x-2 pl-2"
            variant="ghost"
            onClick={() => signOut(true)}
            type="button"
          >
            <LogOut className="h-4 w-4 text-red-500" />
            <span className="text-red-500">Sair da conta</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
