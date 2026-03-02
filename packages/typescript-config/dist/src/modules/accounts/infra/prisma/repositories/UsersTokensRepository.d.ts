import { UserTokens } from '@modules/accounts/domain/UserTokens';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
declare class UsersTokensRepository implements IUsersTokensRepository {
    create({ id, userId, expiresDate, refreshToken, }: UserTokens): Promise<UserTokens>;
    findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
}
export { UsersTokensRepository };
//# sourceMappingURL=UsersTokensRepository.d.ts.map