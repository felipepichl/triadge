import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IResponse {
    users: User[];
}
declare class ListAllUseCase implements IUseCase<void, IResponse> {
    private usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute(): Promise<IResponse>;
}
export { ListAllUseCase };
//# sourceMappingURL=ListAllUseCase.d.ts.map