import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { ListByTypeUseCase } from '@modules/transactions/useCases/transaction/listByType/ListByTypeUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class ListByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.query
    const { id: userId } = request.user

    const listByTypeUseCase = container.resolve(ListByTypeUseCase)

    const result = await listByTypeUseCase.execute({
      userId,
      type: { type } as ITransactionType,
    })

    return response.status(200).json(result)
  }
}

export { ListByTypeController }
