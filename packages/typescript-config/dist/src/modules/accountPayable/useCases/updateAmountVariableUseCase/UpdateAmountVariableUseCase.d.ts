import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    amount: number;
    accountPayableId: string;
}
declare class UpdateAmountVariableUseCase implements IUseCase<IRequest, void> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ amount, accountPayableId }: IRequest): Promise<void>;
}
export { UpdateAmountVariableUseCase };
//# sourceMappingURL=UpdateAmountVariableUseCase.d.ts.map