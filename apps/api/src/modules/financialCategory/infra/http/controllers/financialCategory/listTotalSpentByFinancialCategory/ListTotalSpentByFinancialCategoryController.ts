import { ListTotalSpentByFinancialCategoryUseCase } from '@modules/financialCategory/useCases/financialCategory/listTotalSpentByFinancialCategoryUseCase/ListTotalSpentByFinancialCategoryUseCase'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListTotalSpentByFinancialCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, month } = request.query
    const { id } = request.user

    const listTotalSpentByFinancialCategoryUseCase = container.resolve(
      ListTotalSpentByFinancialCategoryUseCase,
    )

    const result = await listTotalSpentByFinancialCategoryUseCase.execute({
      userId: id,
      type: { type } as ITransactionType,
      month: Number(month),
    })

    return response.status(200).json(result)
  }
}

export { ListTotalSpentByFinancialCategoryController }
