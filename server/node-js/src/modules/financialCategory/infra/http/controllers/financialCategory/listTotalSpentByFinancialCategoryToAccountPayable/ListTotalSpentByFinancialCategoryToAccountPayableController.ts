import { ListTotalSpentByFinancialCategoryToAccountPayableUseCase } from '@modules/financialCategory/useCases/financialCategory/listTotalSpentByFinancialCategoryToAccountPayableUseCase/ListTotalSpentByFinancialCategoryToAccountPayableUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListTotalSpentByFinancialCategoryToAccountPayableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { month } = request.query
    const { id: userId } = request.user

    const listTotalSpentByFinancialCategoryToAccountPayableUseCase =
      container.resolve(
        ListTotalSpentByFinancialCategoryToAccountPayableUseCase,
      )

    const result =
      await listTotalSpentByFinancialCategoryToAccountPayableUseCase.execute({
        userId,
        month: Number(month),
      })

    return response.status(200).json(result)
  }
}

export { ListTotalSpentByFinancialCategoryToAccountPayableController }
