import { Stock } from '@modules/stock/domain/Stock'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  shortName: string
  symbol: string
  price: number
  date: Date
  quantity: number
  userId: string
}

class CreateStocksUseCase implements IUseCase<IRequest, void> {
  constructor(private stocksRepository: IStockRepository) {}

  async execute({
    shortName,
    symbol,
    price,
    date,
    quantity,
    userId,
  }: IRequest): Promise<void> {
    const stock = Stock.createStock({
      shortName,
      symbol,
      price,
      date,
      quantity,
      userId,
    })

    await this.stocksRepository.create(stock)
  }
}

export { CreateStocksUseCase }
