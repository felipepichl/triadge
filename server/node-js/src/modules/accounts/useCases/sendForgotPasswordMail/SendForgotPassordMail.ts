import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'

import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPassordMail implements IUseCase<IRequest, void> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return null
    }

    const { id } = user

    const token = uuid()

    const expiresDate = this.dateProvider.addHours(3)

    const userTokens = UserTokens.createUserTokens({
      userId: id.toString(),
      expiresDate,
      refreshToken: token,
    })

    await this.usersTokensRepository.create(userTokens)
  }
}

export { SendForgotPassordMail }
