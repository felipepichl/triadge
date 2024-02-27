import { DraftingCompass, School, Wallet } from 'lucide-react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import { CustomNavlink } from './menu/custom-nav-link'
import { ResponsiveMenu } from './menu/responsive-menu'

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <DraftingCompass className="h-5 w-5" />

        <Separator orientation="vertical" className="h-6" />

        <ResponsiveMenu />

        <nav className="hidden items-center space-x-4 lg:flex lg:space-x-6">
          <CustomNavlink to="/" icon={School} description="Início" />
          <CustomNavlink to="/finances" icon={Wallet} description="Finanças" />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
