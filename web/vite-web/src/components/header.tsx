import { DraftingCompass } from 'lucide-react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import { Manubar } from './menu/menubar'
// import { MenuProvider } from './menu/menubar-provider'

export default function Header() {
  return (
    <header className="fixed z-50 w-full border-b bg-background shadow-md">
      <div className="flex h-16 items-center gap-6 px-6">
        <DraftingCompass className="h-5 w-5" />

        <Separator orientation="vertical" className="h-6" />

        {/* 
          <MenuProvider>
          </MenuProvider>
        */}

        <Manubar />

        {/* <nav className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          <CustomNavlink to="/" icon={School} description="Início" />
          <CustomNavlink to="/finances" icon={Wallet} description="Finanças" />
        </nav> */}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
