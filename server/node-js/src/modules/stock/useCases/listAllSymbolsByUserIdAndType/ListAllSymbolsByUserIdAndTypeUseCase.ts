import { Stock } from '@modules/stock/domain/Stock'
import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  userId: string
  type: IStockType
}

interface IResponse {
  stocks: Stock[]
}

class ListAllSymbolsByUserIdAndTypeUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    private stocksRepository: IStockRepository,
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const symbols = await this.stocksRepository.listAllSymbolsByUserIdAndType(
      userId,
      type,
    )
  }
}

export { ListAllSymbolsByUserIdAndTypeUseCase }
