import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/domain/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  userIds: string[]
}

interface IResponse {
  users: User[]
}

@injectable()
class FindUsersByIdsUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userIds }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.findByIds(userIds)

    return {
      users,
    }
  }
}

export { FindUsersByIdsUseCase }
