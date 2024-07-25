import { ListByDateRangeUseCase } from '@modules/transactions/useCases/transaction/listByDateRange/ListByDateRangeUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListByDateRangeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { startDate, endDate } = request.query
    const { id: userId } = request.user

    const listByDateRangeUseCase = container.resolve(ListByDateRangeUseCase)

    const result = await listByDateRangeUseCase.execute({
      userId,
      startDate: new Date(String(startDate)),
      endDate: new Date(String(endDate)),
    })

    return response.status(200).json(result)
  }
}

export { ListByDateRangeController }
