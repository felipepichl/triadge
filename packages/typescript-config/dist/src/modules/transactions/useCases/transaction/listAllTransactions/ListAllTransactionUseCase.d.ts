import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
}
interface Balance {
    income: number;
    outcome: number;
    total: number;
}
interface IResponse {
    transactions: Transaction[];
    balance: Balance;
}
declare class ListAllTransactionUseCase implements IUseCase<IRequest, IResponse> {
    private transactionsRepository;
    constructor(transactionsRepository: ITransactionsRepository);
    execute({ userId }: IRequest): Promise<IResponse>;
}
export { ListAllTransactionUseCase };
//# sourceMappingURL=ListAllTransactionUseCase.d.ts.map