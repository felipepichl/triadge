import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = []

  async create(userTokens: UserTokens): Promise<UserTokens> {
    this.usersTokens.push(userTokens)

    return userTokens
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens | null> {
    return this.usersTokens.find(
      (userTokens) =>
        userTokens.userId === userId &&
        userTokens.refreshToken === refreshToken,
    )
  }

  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(
      (userTokens) => userTokens.id.toString() === id,
    )

    this.usersTokens.splice(index, 1)
  }

  async deleteExpiredByUserId(userId: string): Promise<void> {
    const now = new Date()
    this.usersTokens = this.usersTokens.filter(
      (token) => !(token.userId === userId && token.expiresDate < now),
    )
  }
}

export { UsersTokenRepositoryInMemory }
