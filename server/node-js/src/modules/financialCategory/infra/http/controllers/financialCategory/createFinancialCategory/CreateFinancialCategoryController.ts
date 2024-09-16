import { CreateFinancialCategoryUseCase } from '@modules/financialCategory/useCases/financialCategory/createFinancialCategory/CreateFinancialCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateFinancialCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body

    const createFinancialCategoryUseCase = container.resolve(
      CreateFinancialCategoryUseCase,
    )

    await createFinancialCategoryUseCase.execute({
      description,
    })

    return response.status(201).send()
  }
}

export { CreateFinancialCategoryController }
