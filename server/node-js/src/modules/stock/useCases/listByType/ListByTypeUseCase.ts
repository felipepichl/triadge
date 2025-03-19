import { Stock } from '@modules/stock/domain/Stock'
import { IStockType } from '@modules/stock/domain/StockType'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  type: IStockType
}

interface IResponse {
  stocks: Stock[]
}

@injectable()
class ListByTypeUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('StockRepository')
    private stocksRepository: IStockRepository,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stocks = await this.stocksRepository.listByType(userId, type)

    return {
      stocks,
    }
  }
}

export { ListByTypeUseCase }
