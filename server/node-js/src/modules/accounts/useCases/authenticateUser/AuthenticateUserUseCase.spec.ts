import 'reflect-metadata'

import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProviderInMemory: HashProviderInMemory
let dateProviderInMemory: DateProviderInMemory
let userTokensInMemory: UsersTokenRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe('[Account] - Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProviderInMemory = new HashProviderInMemory()
    dateProviderInMemory = new DateProviderInMemory()
    userTokensInMemory = new UsersTokenRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    )
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
      userTokensInMemory,
      dateProviderInMemory,
    )
  })

  it('should be able to authenticate an user', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserUseCase.execute(user)

    const { email, password } = user

    const response = await authenticateUserUseCase.execute({
      email,
      password,
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toBeDefined()
    expect(response.user.email).toEqual(email)
    expect(response.refreshToken).toBeDefined()
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non_existing@example.com',
        password: 'hash123',
      }),
    ).rejects.toEqual(new AppError('Incorret email/password combination'))
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserUseCase.execute(user)

    const { email } = user

    await expect(
      authenticateUserUseCase.execute({
        email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AppError('Incorret email/password combination'))
  })
})
