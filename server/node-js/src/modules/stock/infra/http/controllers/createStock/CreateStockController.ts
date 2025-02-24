import { CreateStocksUseCase } from '@modules/stock/useCases/createStocks/CreateStocksUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateStockController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { symbol, price, date, quantity } = request.body
    const { id: userId } = request.user

    const useCase = container.resolve(CreateStocksUseCase)

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

export { CreateStockController }
