import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUsersTokensRepository } from '../IUsersTokensRepository'

class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = []

  async create(userTokens: UserTokens): Promise<UserTokens> {
    this.usersTokens.push(userTokens)

    return this.usersTokens[0]
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens> {
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

    this.usersTokens.splice(index)
  }
}

export { UsersTokenRepositoryInMemory }
