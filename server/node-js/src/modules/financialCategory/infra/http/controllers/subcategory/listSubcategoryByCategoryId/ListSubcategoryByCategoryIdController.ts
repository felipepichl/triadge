import { ListSubcategoriesByCategoryIdUseCase } from '@modules/financialCategory/useCases/subcategory/listSubcategoriesByCategoryId/ListSubcategoriesByCategoryIdUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListSubcategoryByCategoryIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { parentCategoryId } = request.params
    const { id } = request.user

    const listSubcategoriesByCategoryIdUseCase = container.resolve(
      ListSubcategoriesByCategoryIdUseCase,
    )

    const result = await listSubcategoriesByCategoryIdUseCase.execute({
      userId: id,
      parentCategoryId,
    })

    return response.status(200).json(result)
  }
}

export { ListSubcategoryByCategoryIdController }
