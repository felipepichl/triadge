import { Transaction } from '@modules/transactions/domain/transaction/Transaction';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    startDate: Date;
    endDate: Date;
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
declare class ListByDateRangeUseCase implements IUseCase<IRequest, IResponse> {
    private transactionsRepository;
    constructor(transactionsRepository: ITransactionsRepository);
    execute({ userId, startDate, endDate }: IRequest): Promise<IResponse>;
}
export { ListByDateRangeUseCase };
//# sourceMappingURL=ListByDateRangeUseCase.d.ts.map