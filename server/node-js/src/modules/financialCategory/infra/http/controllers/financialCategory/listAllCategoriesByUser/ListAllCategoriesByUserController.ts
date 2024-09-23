import { ListAllCategoriesByUserUseCase } from '@modules/financialCategory/useCases/financialCategory/listAllCategoriesByUser/ListAllCategoriesByUserUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllCategoriesByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listAllCategoriesByUserUseCase = container.resolve(
      ListAllCategoriesByUserUseCase,
    )

    const result = await listAllCategoriesByUserUseCase.execute({
      userId: id,
    })

    return response.status(200).json(result)
  }
}

export { ListAllCategoriesByUserController }
