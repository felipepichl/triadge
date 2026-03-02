import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}
declare class CreateUserUseCase implements IUseCase<IRequest, void> {
    private usersRepository;
    private hashProvider;
    constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider);
    execute({ name, email, password, phoneNumber, }: IRequest): Promise<void>;
}
export { CreateUserUseCase };
//# sourceMappingURL=CreateUserUseCase.d.ts.map