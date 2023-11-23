import { RefreshTokenUseCase } from './RefreshTokenUseCase'

import { TokenProviderInMemory } from '@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'

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
    const fakeToken = tokenProviderInMemory.encodeToken(
      {
        email: 'example@email.com',
        sub: 'hash_123',
      },
      'secret',
      'expiresIn',
    )

    const response = await refreshTokenUseCase.execute({
      token: fakeToken,
    })

    console.log(response)
  })
})
