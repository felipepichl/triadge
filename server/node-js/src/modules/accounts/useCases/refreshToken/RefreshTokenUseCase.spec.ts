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
    const user = User.createUser({
      name: 'name',
      email: 'name@email.com',
      phoneNumber: '9999999999',
    })

    const usersRepositoryInMemory = new UsersRepositoryInMemory()

    await usersRepositoryInMemory.create(user)

    const { id, email } = user

    const userToken = UserTokens.createUserTokens({
      userId: id.toString(),
      expiresDate: new Date(),
      refreshToken: tokenProviderInMemory.encodeToken(
        {
          email,
          sub: id.toString(),
        },
        'secret',
        'expiresIn',
      ),
    })

    const userTokenCreated = await usersTokensRepository.create(userToken)

    console.log(userTokenCreated)

    // const fakeToken = tokenProviderInMemory.encodeToken(
    //   {
    //     email: 'example@email.com',
    //     sub: 'hash_123',
    //   },
    //   'secret',
    //   'expiresIn',
    // )

    const response = await refreshTokenUseCase.execute({
      token: userToken.refreshToken,
    })

    console.log(response)
  })
})
