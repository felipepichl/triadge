import { CreateSubcategoryUseCase } from '@modules/financialCategory/useCases/subcategory/createSubcategory/CreateSubcategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateSubcategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, parentCategoryId } = request.body
    const { id } = request.user

    const createSubcategoryUseCase = container.resolve(CreateSubcategoryUseCase)

    await createSubcategoryUseCase.execute({
      description,
      userId: id,
      parentCategoryId,
    })

    return response.status(201).send()
  }
}

export { CreateSubcategoryController }
