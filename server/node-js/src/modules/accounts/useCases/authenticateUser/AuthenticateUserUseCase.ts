import { authConfig } from '@config/auth'
import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider'
import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

const {
  secretToken,
  expiresInToken,
  secretRefreshToken,
  expiresInRefreshToken,
  expiresRefreshTokenDays,
} = authConfig

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
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
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

    const { id, name } = user

    const token = this.tokenProvider.encodeToken(
      {
        sub: id.toString(),
        email,
      },
      secretToken,
      expiresInToken,
    )

    const refreshToken = this.tokenProvider.encodeToken(
      {
        sub: id.toString(),
        email,
      },
      secretRefreshToken,
      expiresInRefreshToken,
    )

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    )

    const userTokens = UserTokens.createUserTokens({
      userId: id.toString(),
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
    })

    await this.usersTokensRepository.create(userTokens)

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
