import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { TokenProviderInMemory } from '@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'
import { AppError } from '@shared/error/AppError'

let refreshTokenUseCase: RefreshTokenUseCase
let usersTokensRepository: UsersTokenRepositoryInMemory
let tokenProviderInMemory: TokenProviderInMemory
let dateProvider: DateProviderInMemory

describe('[Account] - Refresh Token', () => {
  beforeAll(() => {
    usersTokensRepository = new UsersTokenRepositoryInMemory()
    tokenProviderInMemory = new TokenProviderInMemory()
    dateProvider = new DateProviderInMemory()

    refreshTokenUseCase = new RefreshTokenUseCase(
      tokenProviderInMemory,
      usersTokensRepository,
      dateProvider,
    )
  })

  it('should be able to create a new refreshtoken', async () => {
    const userToken = UserTokens.createUserTokens({
      userId: 'userId',
      expiresDate: new Date(),
      refreshToken: tokenProviderInMemory.encodeToken(
        {
          email: 'user@example.com',
          sub: 'userId',
        },
        'secret',
        'expiresIn',
      ),
    })

    const userTokenCreated = await usersTokensRepository.create(userToken)

    const { refreshToken } = userTokenCreated

    const response = await refreshTokenUseCase.execute({
      token: refreshToken,
    })

    expect(response).toHaveProperty('refreshToken')
    expect(typeof response.refreshToken).toBe('string')
  })

  it('should handle invalid refresh token', async () => {
    await expect(
      refreshTokenUseCase.execute({
        token: 'invalidToken',
      }),
    ).rejects.toEqual(new AppError('Refresh Token does not exists', 400))
  })
})
