import { DraftingCompass } from 'lucide-react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'

import { Manubar } from './menu/menubar'

export default function Header() {
  return (
    <header className="fixed z-50 w-full border-b bg-background shadow-md">
      <div className="flex h-16 items-center gap-6 px-6">
        <DraftingCompass className="h-5 w-5" />

        <Separator orientation="vertical" className="h-6" />

        <Manubar />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
