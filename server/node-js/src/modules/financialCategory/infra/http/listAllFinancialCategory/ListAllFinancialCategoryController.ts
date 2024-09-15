import { ListAllFinancialCategoryUseCase } from '@modules/financialCategory/useCases/listAllFinancialCategory/ListAllFinancialCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllFinancialCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllFinancialCategoryUseCase = container.resolve(
      ListAllFinancialCategoryUseCase,
    )

    const result = await listAllFinancialCategoryUseCase.execute()

    return response.status(200).json(result)
  }
}

export { ListAllFinancialCategoryController }
