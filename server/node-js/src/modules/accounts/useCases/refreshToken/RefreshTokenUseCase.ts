import { inject, injectable } from 'tsyringe'

import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'

import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

import { authConfig } from '@config/auth'
const { secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays } =
  authConfig

interface IRequest {
  token: string
}

interface IResponse {
  refreshToken: string
}

@injectable()
class RefreshTokenUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
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

    console.log('userId =>', userId)

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists')
    }

    console.log(userToken)

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

    return {
      refreshToken,
    }
  }
}

export { RefreshTokenUseCase }
