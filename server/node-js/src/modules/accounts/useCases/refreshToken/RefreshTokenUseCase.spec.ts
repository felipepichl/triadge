import { User } from '@modules/accounts/domain/User'
import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { TokenProviderInMemory } from '@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'

import { RefreshTokenUseCase } from './RefreshTokenUseCase'

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

    const token = tokenProviderInMemory.decodeToken('', '')

    // console.log(token)

    // console.log(userTokenCreated)

    const response = await refreshTokenUseCase.execute({
      token: 'encodeToken',
    })

    console.log(response)
  })
})
