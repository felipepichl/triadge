import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider';
import { IMalProvider } from '@shared/container/providers/MailProvider/models/IMalProvider';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    email: string;
}
interface IResponse {
    message: string;
}
declare class SendForgotPassordMailUseCase implements IUseCase<IRequest, IResponse> {
    private usersRepository;
    private usersTokensRepository;
    private dateProvider;
    private mailProvider;
    constructor(usersRepository: IUsersRepository, usersTokensRepository: IUsersTokensRepository, dateProvider: IDateProvider, mailProvider: IMalProvider);
    execute({ email }: IRequest): Promise<IResponse>;
}
export { SendForgotPassordMailUseCase };
//# sourceMappingURL=SendForgotPassordMailUseCase.d.ts.map