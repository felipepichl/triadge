import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    month: number;
}
interface IResponse {
    unpaidAccountsPayable: AccountPayable[];
    unpaidAccountsPayableTotalAmount: number;
}
declare class ListAllUnpaidAccountsByMonthUseCase implements IUseCase<IRequest, IResponse> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ userId, month }: IRequest): Promise<IResponse>;
}
export { ListAllUnpaidAccountsByMonthUseCase };
//# sourceMappingURL=ListAllUnpaidAccountsByMonthUseCase.d.ts.map