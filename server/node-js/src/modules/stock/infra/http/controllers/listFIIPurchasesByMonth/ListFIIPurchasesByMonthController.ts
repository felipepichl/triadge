import { ListFIIPurchasesByMonthUseCase } from '@modules/stock/useCases/listFIIPurchasesByMonth/ListFIIPurchasesByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListFIIPurchasesByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query
    const { id: userId } = request.user

    const useCase = container.resolve(ListFIIPurchasesByMonthUseCase)

    const result = await useCase.execute({
      userId,
      month: Number(month),
    })

    return response.status(200).json(result)
  }
}

export { ListFIIPurchasesByMonthController }
