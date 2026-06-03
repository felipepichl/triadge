import { authConfig } from '@config/auth'
import { UserTokens } from '@modules/accounts/domain/UserTokens'
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
  token: string
}

interface IResponse {
  token: string
  refreshToken: string
  user: {
    name: string
    email: string
  }
}

@injectable()
class RefreshTokenUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token }: IRequest): Promise<IResponse> {
    const { sub: userId, email } = this.tokenProvider.decodeToken(
      token,
      secretRefreshToken,
    )

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists')
    }

    await this.usersTokensRepository.deleteById(userToken.id.toString())

    const refreshToken = this.tokenProvider.encodeToken(
      {
        sub: userId.toString(),
        email,
      },
      secretRefreshToken,
      expiresInRefreshToken,
    )

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    )

    const userTokens = UserTokens.createUserTokens({
      userId: userId.toString(),
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
    })

    await this.usersTokensRepository.create(userTokens)

    const user = await this.usersRepository.findById(userId.toString())

    if (!user) {
      throw new AppError('User not found')
    }

    const newToken = this.tokenProvider.encodeToken(
      {
        sub: userId.toString(),
        email,
      },
      secretToken,
      expiresInToken,
    )

    return {
      token: newToken,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    }
  }
}

export { RefreshTokenUseCase }
