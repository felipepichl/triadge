import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    description: string;
    amount: number;
    dueDate: Date;
    userId: string;
    financialCategoryId: string;
    subcategoryId: string;
    installments?: number;
}
declare class CreateAccountPayableUseCase implements IUseCase<IRequest, void> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ description, amount, dueDate, userId, financialCategoryId, subcategoryId, installments, }: IRequest): Promise<void>;
}
export { CreateAccountPayableUseCase };
//# sourceMappingURL=CreateAccountPayableUseCase.d.ts.map