import { ListAllTransactionCategoriesUseCase } from '@modules/transactions/useCases/category/listAllTransactionCategories/ListAllTransactionCategoriesUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllTransactionCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllTransactionCategoryUseCase = container.resolve(
      ListAllTransactionCategoriesUseCase,
    )

    const result = await listAllTransactionCategoryUseCase.execute()

    return response.status(200).json(result)
  }
}

export { ListAllTransactionCategoriesController }
