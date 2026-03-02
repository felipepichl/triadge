import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
}
interface IResponse {
    fixedAccountsPayable: AccountPayable[];
    fixedAccountsPayableTotalAmount: number;
}
declare class ListAllFixedAccountsByMonthUseCase implements IUseCase<IRequest, IResponse> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListAllFixedAccountsByMonthUseCase };
//# sourceMappingURL=ListAllFixedAccountsByMonthUseCase.d.ts.map