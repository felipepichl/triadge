import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/domain/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  users: User[]
}

@injectable()
class ListAllUseCase implements IUseCase<void, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const users = await this.usersRepository.listAll()

    return {
      users,
    }
  }
}

export { ListAllUseCase }
