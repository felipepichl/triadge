import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refreshToken: string;
}
declare class AuthenticateUserUseCase implements IUseCase<IRequest, IResponse> {
    private usersRepository;
    private hashProvider;
    private tokenProvider;
    private usersTokensRepository;
    private dateProvider;
    constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider, tokenProvider: ITokenProvider, usersTokensRepository: IUsersTokensRepository, dateProvider: IDateProvider);
    execute({ email, password }: IRequest): Promise<IResponse>;
}
export { AuthenticateUserUseCase };
//# sourceMappingURL=AuthenticateUserUseCase.d.ts.map