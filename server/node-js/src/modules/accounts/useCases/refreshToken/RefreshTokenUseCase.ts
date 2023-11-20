import { inject, injectable } from 'tsyringe'

import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

import { authConfig } from '@config/auth'
const { secretRefreshToken } = authConfig

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
  ) {}

  async execute({ token }: IRequest): Promise<IResponse> {
    const { sub: userId } = this.tokenProvider.decodeToken(
      token,
      secretRefreshToken,
    )

    await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token)

    throw new Error('Method not implemented.')
  }
}

export { RefreshTokenUseCase }
