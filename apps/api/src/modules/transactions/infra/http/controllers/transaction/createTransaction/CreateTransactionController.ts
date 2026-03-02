import { CreateTransactionUseCase } from '@modules/transactions/useCases/transaction/createTransactions/CreateTransactionUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      detail,
      type,
      date,
      amount,
      financialCategoryId,
      subcategoryId,
    } = request.body
    const { id: userId } = request.user

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

    await createTransactionUseCase.execute({
      description,
      detail,
      type,
      date,
      amount,
      userId,
      financialCategoryId,
      subcategoryId,
    })

    return response.status(201).send()
  }
}

export { CreateTransactionController }
