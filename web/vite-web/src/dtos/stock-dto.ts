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
  }[]
}

export type InvestementResponseDTO = {
  totalInvested: number
  currentValue: number
}
