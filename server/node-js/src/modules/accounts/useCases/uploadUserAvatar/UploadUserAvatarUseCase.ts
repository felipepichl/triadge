import { injectable, inject } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UploadUserAvatarUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('Only authenticated can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar')
    }

    const filename = await this.storageProvider.saveFile(avatarFile, 'avatar')

    user.updateAvatar(filename)

    await this.usersRepository.create(user)
  }
}

export { UploadUserAvatarUseCase }
