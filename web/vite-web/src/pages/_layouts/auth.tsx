import { DraftingCompass } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-foreground/5 bg-muted p-5 text-muted-foreground md:flex md:p-10">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <DraftingCompass className="h-5 w-5" />
          <span className="font-semibold">GOEMB</span>
        </div>
        <footer className="text-xs md:text-sm">
          Painel administrativo &copy; Triadge - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
