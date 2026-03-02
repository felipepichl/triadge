import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    token: string;
}
interface IResponse {
    refreshToken: string;
}
declare class RefreshTokenUseCase implements IUseCase<IRequest, IResponse> {
    private tokenProvider;
    private usersTokensRepository;
    private dateProvider;
    constructor(tokenProvider: ITokenProvider, usersTokensRepository: IUsersTokensRepository, dateProvider: IDateProvider);
    execute({ token }: IRequest): Promise<IResponse>;
}
export { RefreshTokenUseCase };
//# sourceMappingURL=RefreshTokenUseCase.d.ts.map