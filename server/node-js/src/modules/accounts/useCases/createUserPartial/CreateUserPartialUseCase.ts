import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/domain/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  name: string
  phoneNumber: string
}

@injectable()
class CreateUserPartialUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, phoneNumber }: IRequest): Promise<void> {
    const userAllReadyExists =
      await this.usersRepository.findByPhoneNumber(phoneNumber)

    if (userAllReadyExists) {
      throw new AppError('Users already exists', 400)
    }

    const user = User.createUser({
      name,
      phoneNumber,
    })

    await this.usersRepository.create(user)
  }
}

export { CreateUserPartialUseCase }
