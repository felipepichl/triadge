import { User } from '@modules/accounts/domain/User'
import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateUserUseCase } from './CreateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProviderInMemory: HashProviderInMemory
let createUserUseCase: CreateUserUseCase

describe('[Account] - Create a user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProviderInMemory = new HashProviderInMemory()
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    )
  })

  it('should be able to create a new user', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserUseCase.execute(user)

    const { email } = user

    const userCreated = await usersRepositoryInMemory.findByEmail(email)

    expect(userCreated).toBeDefined()
    expect(userCreated?.email).toEqual(user.email)
  })

  it('should not be able to create a new user with same email another', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserUseCase.execute(user)

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError('Users already exists', 400),
    )
  })
})
