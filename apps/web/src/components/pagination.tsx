import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

type PaginationProps = {
  pageIndex: number
  totalCount: number
  parPage: number
}

type NavigationButtonType = {
  icon: React.ReactElement
  label: string
  onClick: () => void
}

function NavigationButton({ icon, label, onClick }: NavigationButtonType) {
  return (
    <Button
      variant="outline"
      className="h-8 w-8 rounded-full p-0"
      onClick={onClick}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export function Pagination({
  pageIndex,
  totalCount,
  parPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / parPage) || 1

  return (
    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <NavigationButton
            icon={<ChevronsLeft className="h-4 w-4" />}
            label="Primeira Página"
            onClick={() => console.log('Primeira página')}
          />
          <NavigationButton
            icon={<ChevronLeft className="h-4 w-4" />}
            label="Página anterior"
            onClick={() => console.log('Página anterior')}
          />
          <NavigationButton
            icon={<ChevronRight className="h-4 w-4" />}
            label="Próxima página"
            onClick={() => console.log('Próxima página')}
          />
          <NavigationButton
            icon={<ChevronsRight className="h-4 w-4" />}
            label="Última página"
            onClick={() => console.log('Última página')}
          />
        </div>
      </div>
    </div>
  )
}
