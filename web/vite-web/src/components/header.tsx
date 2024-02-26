import { DraftingCompass, MenuSquare, School, Wallet } from 'lucide-react'
import { useState } from 'react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import { CustomNavlink } from './menu/custom-nav-link'
import { ResponsiveMenu } from './menu/responsive-menu'
import { NavLink } from './nav-link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <DraftingCompass className="h-5 w-5" />

        <Separator orientation="vertical" className="h-6" />

        <ResponsiveMenu />

        {/* Menu para telas grandes */}
        <nav className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          <CustomNavlink to="/" icon={School} description="Início" />
          <CustomNavlink to="/finances" icon={Wallet} description="Finanças" />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>

        {/* <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <School className="h-4 w-4" />
            Inicio
          </NavLink>
          <NavLink to="/finances">
            <Wallet className="h-4 w-4" />
            Finanças
          </NavLink>
        </nav> */}
      </div>
    </div>
  )
}
