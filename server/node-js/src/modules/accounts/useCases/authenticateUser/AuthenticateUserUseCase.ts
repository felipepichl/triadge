import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { authConfig } from '@config/auth'

import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refreshToken: string
}

@injectable()
class AuthenticateUserUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorret email/password combination')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppError('Incorret email/password combination')
    }

    const {
      secretToken,
      expiresInToken,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig

    const token = sign({}, secretToken, {
      subject: user.id.toString(),
      expiresIn: expiresInToken,
    })

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id.toString(),
      expiresIn: expiresInRefreshToken,
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    )

    const userTokens = UserTokens.createUserTokens({
      userId: user.id.toString(),
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
    })

    await this.usersTokensRepository.create(userTokens)

    const { name } = user

    const returnResponse: IResponse = {
      user: {
        name,
        email,
      },
      token,
      refreshToken,
    }

    return returnResponse
  }
}

export { AuthenticateUserUseCase }
