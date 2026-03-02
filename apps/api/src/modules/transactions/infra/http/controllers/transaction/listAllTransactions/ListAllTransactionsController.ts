import { ListAllTransactionUseCase } from '@modules/transactions/useCases/transaction/listAllTransactions/ListAllTransactionUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListAllTransactionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user

    const listAllTransactionsUseCase = container.resolve(
      ListAllTransactionUseCase,
    )

    const result = await listAllTransactionsUseCase.execute({
      userId,
    })

    return response.status(200).json(result)
  }
}

export { ListAllTransactionsController }
