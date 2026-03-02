import { ListByMonthUseCase } from '@modules/transactions/useCases/transaction/listByMonth/ListByMonthUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListByMonthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query
    const { id: userId } = request.user

    const listByMonthUseCase = container.resolve(ListByMonthUseCase)

    const result = await listByMonthUseCase.execute({
      userId,
      month: Number(month),
    })

    return response.status(200).json(result)
  }
}

export { ListByMonthController }
