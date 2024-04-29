import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  userId: string
}

interface IResponse {
  transactions: Transaction[]
}

class ListAllTransactionUseCase implements IUseCase<IResponse, IRequest> {
  execute({ userId }: IRequest): Promise<IResponse> {
    throw new Error('Method not implemented.')
  }
}

export { ListAllTransactionUseCase }
