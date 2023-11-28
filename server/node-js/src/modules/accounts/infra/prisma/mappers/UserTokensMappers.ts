/* eslint-disable camelcase */
import { UserTokens } from '@modules/accounts/domain/UserTokens'
import { UserTokens as RawUserTokens } from '@prisma/client'

import { IMapper } from '@shared/core/infra/Mapper'

class UserTokensMappers implements IMapper<UserTokens, RawUserTokens> {
  toPersistence(usertokens: UserTokens): UserTokens {
    return usertokens
  }

  toDomain(raw: RawUserTokens): UserTokens {
    return UserTokens.createUserTokens(raw)
  }

  toDomainArray(rawUserTokens: RawUserTokens[]): UserTokens[] {
    return rawUserTokens.map(this.toDomain)
  }

  getMapper(): IMapper<UserTokens, RawUserTokens> {
    return new UserTokensMappers()
  }

  static getMapper(): UserTokensMappers {
    return new UserTokensMappers()
  }
}

export { UserTokensMappers }
