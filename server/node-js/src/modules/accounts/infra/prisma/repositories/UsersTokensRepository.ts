import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { UserTokensMappers } from '../mappers/UserTokensMappers'

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    userId,
    expiresDate,
    refreshToken,
  }: UserTokens): Promise<UserTokens> {
    const result = await PrismaSingleton.getInstance().userTokens.create({
      data: {
        userId,
        expiresDate,
        refreshToken,
      },
    })

    return UserTokensMappers.getMapper().toDomain(result)
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens> {
    const result = await PrismaSingleton.getInstance().userTokens.findFirst({
      where: { userId, refreshToken },
    })

    return UserTokensMappers.getMapper().toDomain(result)
  }

  async deleteById(id: string): Promise<void> {
    await PrismaSingleton.getInstance().userTokens.delete({
      where: { id },
    })
  }
}

export { UsersTokensRepository }
