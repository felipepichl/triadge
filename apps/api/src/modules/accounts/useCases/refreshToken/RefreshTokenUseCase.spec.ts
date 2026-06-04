import { User } from '@modules/accounts/domain/User'
import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { TokenProviderInMemory } from '@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'
import { AppError } from '@shared/error/AppError'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

let refreshTokenUseCase: RefreshTokenUseCase
let usersRepository: UsersRepositoryInMemory
let usersTokensRepository: UsersTokenRepositoryInMemory
let tokenProviderInMemory: TokenProviderInMemory
let dateProvider: DateProviderInMemory

describe('[Account] - Refresh Token', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory()
    usersTokensRepository = new UsersTokenRepositoryInMemory()
    tokenProviderInMemory = new TokenProviderInMemory()
    dateProvider = new DateProviderInMemory()

    refreshTokenUseCase = new RefreshTokenUseCase(
      tokenProviderInMemory,
      usersRepository,
      usersTokensRepository,
      dateProvider,
    )

    const user = User.createUser({
      id: 'userId',
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password',
      phoneNumber: '123456789',
    })

    await usersRepository.create(user)
  })

  it('should be able to create a new refresh token', async () => {
    const userToken = UserTokens.createUserTokens({
      userId: 'userId',
      expiresDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
    expect(response.user.name).toBe('John Doe')
    expect(response.user.email).toBe('user@example.com')
  })

  it('should delete expired tokens when refreshing', async () => {
    const expiredToken = UserTokens.createUserTokens({
      userId: 'userId',
      expiresDate: new Date(Date.now() - 1000),
      refreshToken: 'expired-token',
    })

    await usersTokensRepository.create(expiredToken)

    const validToken = UserTokens.createUserTokens({
      userId: 'userId',
      expiresDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      refreshToken: tokenProviderInMemory.encodeToken(
        {
          email: 'user@example.com',
          sub: 'userId',
        },
        'secret',
        'expiresIn',
      ),
    })

    const created = await usersTokensRepository.create(validToken)

    await refreshTokenUseCase.execute({ token: created.refreshToken })

    const expiredStillExists =
      await usersTokensRepository.findByUserIdAndRefreshToken(
        'userId',
        'expired-token',
      )

    expect(expiredStillExists).toBeFalsy()
  })

  it('should handle invalid refresh token', async () => {
    await expect(
      refreshTokenUseCase.execute({
        token: 'invalidToken',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
