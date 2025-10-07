import { BuyUseCase } from '@modules/stock/useCases/buy/BuyUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class BuyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { symbol, price, date, quantity, type } = request.body
    const { id: userId } = request.user

    const useCase = container.resolve(BuyUseCase)

    await useCase.execute({
      symbol,
      price,
      date,
      quantity,
      type,
      userId,
    })

    return response.status(201).send()
  }
}

export { BuyController }
