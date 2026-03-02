import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    type: ITransactionType;
}
interface IResponse {
    transactions: Transaction[];
}
declare class ListByTypeUseCase implements IUseCase<IRequest, IResponse> {
    private transactionsRepository;
    constructor(transactionsRepository: ITransactionsRepository);
    execute({ userId, type }: IRequest): Promise<IResponse>;
}
export { ListByTypeUseCase };
//# sourceMappingURL=ListByTypeUseCase.d.ts.map