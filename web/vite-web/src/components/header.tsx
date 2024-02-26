import { DraftingCompass, MenuSquare, School, Wallet } from 'lucide-react'
import { useState } from 'react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import NavLink from './nav-link'

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

        <button className="lg:hidden" onClick={toggleMenu}>
          <MenuSquare className="h-5 w-5" />
        </button>

        {/* Menu para telas grandes */}
        <nav className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          <NavLink to="/">
            <School className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/finances">
            <Wallet className="h-4 w-4" />
            Finanças
          </NavLink>
        </nav>

        {/* Menu para telas pequenas */}
        {menuOpen && (
          <div
            className={`
              absolute 
              left-0 
              top-16 
              ml-2 
              mt-2 
              rounded-md 
              border  
              shadow-md 
              transition-opacity 
              duration-300 
              lg:hidden ${
                menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
          >
            <nav className="flex flex-col items-start space-y-4 p-4">
              <NavLink
                to="/"
                className="flex items-center space-x-2 pl-2"
                onClick={toggleMenu}
              >
                <School className="h-4 w-4" />
                <span>Início</span>
              </NavLink>
              <NavLink
                to="/finances"
                className="flex items-center space-x-2 pl-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Finanças</span>
              </NavLink>
            </nav>
          </div>
        )}

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
