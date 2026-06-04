import { ListTotalSpentToFixedAccountPayableUseCase } from '@modules/financialCategory/useCases/financialCategory/listTotalSpentToFixedAccountPayableUseCase/ListTotalSpentToFixedAccountPayableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListTotalSpentToFixedAccountPayableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { id: userId } = request.user

    const listTotalSpentToFixedAccountPayableUseCase = container.resolve(
      ListTotalSpentToFixedAccountPayableUseCase,
    )

    const result = await listTotalSpentToFixedAccountPayableUseCase.execute({
      userId,
      month: Number(month),
      year: year ? Number(year) : new Date().getFullYear(),
    })

    return response.status(200).json(result)
  }
}

export { ListTotalSpentToFixedAccountPayableController }
