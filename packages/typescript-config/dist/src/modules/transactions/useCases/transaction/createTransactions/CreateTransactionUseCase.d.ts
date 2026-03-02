import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    description: string;
    detail: string;
    type: 'income' | 'outcome';
    date?: Date;
    amount: number;
    userId: string;
    financialCategoryId: string;
    subcategoryId: string;
}
declare class CreateTransactionUseCase implements IUseCase<IRequest, void> {
    private transactionsRepository;
    constructor(transactionsRepository: ITransactionsRepository);
    execute({ description, detail, type, date, amount, userId, financialCategoryId, subcategoryId, }: IRequest): Promise<void>;
}
export { CreateTransactionUseCase };
//# sourceMappingURL=CreateTransactionUseCase.d.ts.map