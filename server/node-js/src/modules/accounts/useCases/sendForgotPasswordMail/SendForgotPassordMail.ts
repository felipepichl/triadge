import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { UserTokens } from '@modules/accounts/domain/UserTokens'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPassordMail implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return null
    }

    const { id } = user

    const token = uuid()

    UserTokens.createUserTokens({
      userId: id.toString(),
      expiresDate: new Date(),
      refreshToken: token,
    })
  }
}

export { SendForgotPassordMail }
