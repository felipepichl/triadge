import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
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
declare class ListByMonthUseCase implements IUseCase<IRequest, IResponse> {
    private transactionsRepository;
    constructor(transactionsRepository: ITransactionsRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListByMonthUseCase };
//# sourceMappingURL=ListByMonthUseCase.d.ts.map