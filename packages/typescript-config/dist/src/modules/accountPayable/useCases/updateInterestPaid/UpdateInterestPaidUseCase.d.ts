import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    amount: number;
    accountPayableId: string;
}
declare class UpdateInterestPaidUseCase implements IUseCase<IRequest, void> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ amount, accountPayableId }: IRequest): Promise<void>;
}
export { UpdateInterestPaidUseCase };
//# sourceMappingURL=UpdateInterestPaidUseCase.d.ts.map