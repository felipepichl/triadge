import { IStockType } from '@modules/stock/domain/StockType'
import { GetTotalInvestedAndCurrentQuoteUseCase } from '@modules/stock/useCases/getTotalInvestedAndCurrentQuote/GetTotalInvestedAndCurrentQuoteUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class GetTotalInvestedAndCurrentQuoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.query
    const { id: userId } = request.user

    const useCase = container.resolve(GetTotalInvestedAndCurrentQuoteUseCase)

    const result = await useCase.execute({
      userId,
      type: { stockType: type } as IStockType,
    })

    return response.status(200).json(result)
  }
}

export { GetTotalInvestedAndCurrentQuoteController }
