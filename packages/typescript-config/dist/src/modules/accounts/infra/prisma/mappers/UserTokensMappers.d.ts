import { UserTokens } from '@modules/accounts/domain/UserTokens';
import { UserTokens as RawUserTokens } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
declare class UserTokensMappers implements IMapper<UserTokens, RawUserTokens> {
    toPersistence(usertokens: UserTokens): UserTokens;
    toDomain(raw: RawUserTokens): UserTokens;
    toDomainArray(rawUserTokens: RawUserTokens[]): UserTokens[];
    getMapper(): IMapper<UserTokens, RawUserTokens>;
    static getMapper(): UserTokensMappers;
}
export { UserTokensMappers };
//# sourceMappingURL=UserTokensMappers.d.ts.map