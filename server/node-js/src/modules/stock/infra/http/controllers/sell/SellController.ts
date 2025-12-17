import { SellStocksUseCase } from '@modules/stock/useCases/sellStocks/SellStocksUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class SellController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { symbol, price, date, quantity } = request.body
    const { id: userId } = request.user

    const useCase = container.resolve(SellStocksUseCase)

    await useCase.execute({
      symbol,
      price,
      date,
      quantity,
      userId,
    })

    return response.status(201).send()
  }
}

export { SellController }
