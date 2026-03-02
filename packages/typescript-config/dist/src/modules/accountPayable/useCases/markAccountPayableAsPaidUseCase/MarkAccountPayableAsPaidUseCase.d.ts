import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IResquest {
    accountPayableId: string;
}
declare class MarkAccountPayableAsPaidUseCase implements IUseCase<IResquest, void> {
    private accountsPayableRepository;
    private transactionsRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository, transactionsRepository: ITransactionsRepository);
    execute({ accountPayableId }: IResquest): Promise<void>;
}
export { MarkAccountPayableAsPaidUseCase };
//# sourceMappingURL=MarkAccountPayableAsPaidUseCase.d.ts.map