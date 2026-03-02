import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    description: string;
    amount: number;
    dueDate: Date;
    userId: string;
    financialCategoryId: string;
    subcategoryId: string;
    months?: number;
}
declare class CreateFixedAccountsPayableUseCase implements IUseCase<IRequest, void> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ description, amount, dueDate, userId, financialCategoryId, subcategoryId, months, }: IRequest): Promise<void>;
}
export { CreateFixedAccountsPayableUseCase };
//# sourceMappingURL=CreateFixedAccounsPayableUseCase.d.ts.map