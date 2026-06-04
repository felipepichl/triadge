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
  perPage: number
  onPageChange: (pageIndex: number) => void
}

type NavigationButtonType = {
  icon: React.ReactElement
  label: string
  onClick: () => void
  disabled?: boolean
}

function NavigationButton({
  icon,
  label,
  onClick,
  disabled,
}: NavigationButtonType) {
  return (
    <Button
      variant="outline"
      className="h-8 w-8 rounded-full p-0"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex >= pages - 1

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
            onClick={() => onPageChange(0)}
            disabled={isFirstPage}
          />
          <NavigationButton
            icon={<ChevronLeft className="h-4 w-4" />}
            label="Página anterior"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={isFirstPage}
          />
          <NavigationButton
            icon={<ChevronRight className="h-4 w-4" />}
            label="Próxima página"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={isLastPage}
          />
          <NavigationButton
            icon={<ChevronsRight className="h-4 w-4" />}
            label="Última página"
            onClick={() => onPageChange(pages - 1)}
            disabled={isLastPage}
          />
        </div>
      </div>
    </div>
  )
}
