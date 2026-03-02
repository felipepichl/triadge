import { IStockType } from '@modules/stock/domain/StockType'
import { GetPortfolioQuotesUseCase } from '@modules/stock/useCases/getPortfolioQuotes/GetPortfolioQuotesUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class GetPortfolioQuotesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.query
    const { id: userId } = request.user

    const useCase = container.resolve(GetPortfolioQuotesUseCase)

    const result = await useCase.execute({
      userId,
      type: { stockType: type } as IStockType,
    })

    return response.status(200).json(result)
  }
}

export { GetPortfolioQuotesController }
