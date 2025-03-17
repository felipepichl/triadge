import { IStockType } from '@modules/stock/domain/StockType'
import { ListByTypeUseCase } from '@modules/stock/useCases/listByType/ListByTypeUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.query
    const { id: userId } = request.user

    const useCase = container.resolve(ListByTypeUseCase)

    const { stocks } = await useCase.execute({
      userId,
      type: { stockType: type } as IStockType,
    })

    return response.status(200).json(stocks)
  }
}

export { ListByTypeController }
