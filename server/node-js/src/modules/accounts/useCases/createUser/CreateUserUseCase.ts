import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/domain/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  name: string
  email: string
  password: string
  phoneNumber: string
}

@injectable()
class CreateUserUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    email,
    password,
    phoneNumber,
  }: IRequest): Promise<void> {
    const userAllReadyExists = await this.usersRepository.findByEmail(email)

    if (userAllReadyExists) {
      throw new AppError('Users already exists', 400)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = User.createUser({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    })

    await this.usersRepository.create(user)
  }
}

export { CreateUserUseCase }
