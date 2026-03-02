import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { IUseCase } from '@shared/core/domain/IUseCase';
interface IRequest {
    userId: string;
    avatarFile: string;
}
declare class UploadUserAvatarUseCase implements IUseCase<IRequest, void> {
    private usersRepository;
    private storageProvider;
    constructor(usersRepository: IUsersRepository, storageProvider: IStorageProvider);
    execute({ userId, avatarFile }: IRequest): Promise<void>;
}
export { UploadUserAvatarUseCase };
//# sourceMappingURL=UploadUserAvatarUseCase.d.ts.map