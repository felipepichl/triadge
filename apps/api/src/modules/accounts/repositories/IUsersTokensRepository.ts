import { UserTokens } from '../domain/UserTokens'

interface IUsersTokensRepository {
  create(userTokens: UserTokens): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens>
  deleteById(id: string): Promise<void>
  deleteExpiredByUserId(userId: string): Promise<void>
}

export { IUsersTokensRepository }
