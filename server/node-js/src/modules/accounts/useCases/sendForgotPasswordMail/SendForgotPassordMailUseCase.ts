import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { IMalProvider } from '@shared/container/providers/MailProvider/models/IMalProvider'

import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  email: string
}

interface IResponse {
  message: string
}

@injectable()
class SendForgotPassordMailUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMalProvider,
  ) {}

  async execute({ email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return {
        message: `If the provided ${email} is associated with an account, a recovery email will be sent.`,
      }
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

    await this.mailProvider.sendMail(
      email,
      'Password recovery',
      `Access this link for recovery ${token}`,
    )

    return {
      message: `If the provided ${email} is associated with an account, a recovery email will be sent.`,
    }
  }
}

export { SendForgotPassordMailUseCase }
