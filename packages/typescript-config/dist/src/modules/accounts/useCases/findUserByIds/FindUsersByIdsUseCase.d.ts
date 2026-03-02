import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userIds: string[];
}
interface IResponse {
    users: User[];
}
declare class FindUsersByIdsUseCase implements IUseCase<IRequest, IResponse> {
    private usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute({ userIds }: IRequest): Promise<IResponse>;
}
export { FindUsersByIdsUseCase };
//# sourceMappingURL=FindUsersByIdsUseCase.d.ts.map