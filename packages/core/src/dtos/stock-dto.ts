export type CreateStockDTO = {
  symbol: string
  price: number
  date: Date
  quantity: number
  type: string
}

export type StockDetailDTO = {
  shortName: string
  symbol: string
  totalStock: number
}

export type PortfolioResponseDTO = {
  portfolio: {
    stock: StockDetailDTO
    totalInvested: number
    currentValue: number
    quote: number
    minPrice: number
    maxPrice: number
  }[]
}

export type InvestementResponseDTO = {
  totalInvested: number
  currentValue: number
  position: number
}

export type BuyStockDTO = {
  symbol: string
  price: number
  date: Date
  quantity: number
  type: string
}

export type SellStockDTO = {
  symbol: string
  price: number
  date?: Date
  quantity: number
}
