import { CreateTransactionCategoryUseCase } from '@modules/transactions/useCases/category/createTransactionCategory/CreateTransactionCategoryUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateTransactionCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.body

    const createTransactionCategoryUseCase = container.resolve(
      CreateTransactionCategoryUseCase,
    )

    await createTransactionCategoryUseCase.execute({
      description,
    })

    return response.status(201).send()
  }
}

export { CreateTransactionCategoryController }
