import { Stock } from '@modules/stock/domain/Stock'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
// import { AppError } from '@shared/error/AppError'

interface IRequest {
  symbol: string
  price: number
  date?: Date
  quantity: number
  userId: string
}

class CreateStocksUseCase implements IUseCase<IRequest, void> {
  constructor(
    private stocksRepository: IStockRepository,
    private b3Provider: IB3Provider,
  ) {}

  async execute({
    symbol,
    price,
    date,
    quantity,
    userId,
  }: IRequest): Promise<void> {
    const b3Stock = await this.b3Provider.getQuoteTickers(symbol)

    // if (!b3Stock) {
    //   throw new AppError('Ticket does not exists')
    // }

    console.log(b3Stock)

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
