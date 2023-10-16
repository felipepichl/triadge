import { User } from '@modules/accounts/domain/User'

import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.users.find((user) => user.phoneNumber === phoneNumber)
  }

  async findById(userId: string): Promise<User> {
    const user = this.users.find((user) => user.id.toString() === userId)

    return user
  }

  async findByIds(userIds: string[]): Promise<User[]> {
    return this.users.filter((user) => userIds.includes(user.id.toString()))
  }

  async listAll(): Promise<User[]> {
    return this.users
  }
}

export { UsersRepositoryInMemory }
