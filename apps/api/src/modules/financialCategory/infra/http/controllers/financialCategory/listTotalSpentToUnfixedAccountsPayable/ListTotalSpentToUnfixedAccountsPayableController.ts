import { ListTotalSpentToUnfixedAccountPayableUseCase } from '@modules/financialCategory/useCases/financialCategory/listTotalSpentToUnfixedAccountPayableUseCase/ListTotalSpentToUnfixedAccountPayableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListTotalSpentToUnfixedAccountsPayableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query
    const { id: userId } = request.user

    const listTotalSpentToUnfixedAccountPayableUseCase = container.resolve(
      ListTotalSpentToUnfixedAccountPayableUseCase,
    )

    const result = await listTotalSpentToUnfixedAccountPayableUseCase.execute({
      userId,
      month: Number(month),
      year: year ? Number(year) : new Date().getFullYear(),
    })

    return response.status(200).json(result)
  }
}

export { ListTotalSpentToUnfixedAccountsPayableController }
