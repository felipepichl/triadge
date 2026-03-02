import { CreateFinancialCategoryUseCase } from '@modules/financialCategory/useCases/financialCategory/createFinancialCategory/CreateFinancialCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateFinancialCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body
    const { id } = request.user

    const createFinancialCategoryUseCase = container.resolve(
      CreateFinancialCategoryUseCase,
    )

    await createFinancialCategoryUseCase.execute({
      description,
      userId: id,
    })

    return response.status(201).send()
  }
}

export { CreateFinancialCategoryController }
