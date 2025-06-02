import { Stock } from '@modules/stock/domain/Stock'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  month: number
}

interface IResponse {
  stocks: Stock[]
}

@injectable()
class ListFIIPurchasesByMonthUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('StockRepository')
    private stocksRepository: IStockRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const stocksByMonth = await this.stocksRepository.listByMonth(userId, month)

    const stocks = stocksByMonth.filter((items) => {
      return items.type.stockType === 'fii'
    })

    return {
      stocks,
    }
  }
}

export { ListFIIPurchasesByMonthUseCase }
