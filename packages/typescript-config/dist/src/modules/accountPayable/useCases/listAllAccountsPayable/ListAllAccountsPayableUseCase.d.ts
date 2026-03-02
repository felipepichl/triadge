import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable';
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
}
interface IResponse {
    accountsPayable: AccountPayable[];
}
declare class ListAllAccountsPayable implements IUseCase<IRequest, IResponse> {
    private accountsPayableRepository;
    constructor(accountsPayableRepository: IAccountsPayableRepository);
    execute({ userId }: IRequest): Promise<IResponse>;
}
export { ListAllAccountsPayable };
//# sourceMappingURL=ListAllAccountsPayableUseCase.d.ts.map