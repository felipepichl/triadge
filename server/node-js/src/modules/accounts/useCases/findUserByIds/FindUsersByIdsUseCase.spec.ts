import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import { FindUsersByIdsUseCase } from './FindUsersByIdsUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let findUsersByIdsUseCase: FindUsersByIdsUseCase

describe('[Account] - Find users by ids', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    findUsersByIdsUseCase = new FindUsersByIdsUseCase(usersRepositoryInMemory)
  })

  it('should be able to find users by ids', async () => {
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

    const result = await findUsersByIdsUseCase.execute({
      userIds: [userId1.toString(), userId2.toString()],
    })

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

  it('should return an empty array if no users are found', async () => {
    const { users } = await findUsersByIdsUseCase.execute({
      userIds: ['non-existing-id-1', 'non-existing-id-2'],
    })

    expect(users).toHaveLength(0)
  })
})
