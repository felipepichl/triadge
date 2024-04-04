import { ListAllCategoryUseCase } from '@modules/products/useCases/category/listAll/ListAllCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllCategoryUseCase = container.resolve(ListAllCategoryUseCase)

    const result = await listAllCategoryUseCase.execute()

    return response.status(200).json(result)
  }
}

export { ListAllCategoriesController }
