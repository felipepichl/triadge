import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { ListAllUseCase } from './ListAllUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let listAllUseCase: ListAllUseCase

describe('[Account] - List all users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    listAllUseCase = new ListAllUseCase(usersRepositoryInMemory)
  })

  it('should be able to list all users', async () => {
    const user1 = User.createUser({
      name: 'Test User1',
      email: 'user1@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    const user2 = User.createUser({
      name: 'Test User2',
      email: 'user2@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user1)
    await usersRepositoryInMemory.create(user2)

    const { id: userId1 } = user1
    const { id: userId2 } = user2

    const result = await listAllUseCase.execute()

    expect(result.users).toHaveLength(2)
    expect(result.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: userId1,
        }),
        expect.objectContaining({
          id: userId2,
        }),
      ]),
    )
  })

  it('should return an empty array if no users exist', async () => {
    const result = await listAllUseCase.execute()

    expect(result.users).toHaveLength(0)
  })
})
