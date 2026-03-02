import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
}
interface IResponse {
    unfixedAccountsPayable: AccountPayable[];
    unfixedAccountsPayableTotalAmount: number;
}
declare class ListAllUnfixedAccountsByMonthUseCase implements IUseCase<IRequest, IResponse> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListAllUnfixedAccountsByMonthUseCase };
//# sourceMappingURL=ListAllUnfixedAccountsByMonthUseCase.d.ts.map