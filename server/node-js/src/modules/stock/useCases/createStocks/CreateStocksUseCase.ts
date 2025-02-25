import { Stock } from '@modules/stock/domain/Stock'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
// import { AppError } from '@shared/error/AppError'
import { brapiQuoteTickers } from '@shared/services/brapi/getQuoteTickers'

interface IRequest {
  symbol: string
  price: number
  date?: Date
  quantity: number
  userId: string
}

class CreateStocksUseCase implements IUseCase<IRequest, void> {
  constructor(private stocksRepository: IStockRepository) {}

  async execute({
    symbol,
    price,
    date,
    quantity,
    userId,
  }: IRequest): Promise<void> {
    const b3Stock = await brapiQuoteTickers({
      ticket: symbol,
    })

    // if (!b3Stock) {
    //   throw new AppError('Ticket does not exists')
    // }

    const stock = Stock.createStock({
      shortName: 'null',
      symbol: 'null',
      price,
      date,
      quantity,
      userId,
    })

    await this.stocksRepository.create(stock)
  }
}

export { CreateStocksUseCase }
