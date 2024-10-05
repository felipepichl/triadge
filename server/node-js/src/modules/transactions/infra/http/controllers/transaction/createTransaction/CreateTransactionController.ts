import { CreateTransactionUseCase } from '@modules/transactions/useCases/transaction/createTransactions/CreateTransactionUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { description, detail, type, date, value, financialCategoryId } =
      request.body
    const { id: userId } = request.user

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase)

    await createTransactionUseCase.execute({
      description,
      detail,
      type,
      date,
      value,
      userId,
      financialCategoryId,
    })

    return response.status(201).send()
  }
}

export { CreateTransactionController }
