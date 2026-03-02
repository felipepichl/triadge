import { useContext } from 'react'

import { StockContext, StockContextData } from '@/contexts/app/stock-context'

export function useStock(): StockContextData {
  const context = useContext(StockContext)

  if (!context) {
    throw new Error('useStock must be used within an StockProvider')
  }

  return context
}
