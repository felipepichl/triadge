import { UserTokens } from '@modules/accounts/domain/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';
declare class UsersTokenRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens;
    create(userTokens: UserTokens): Promise<UserTokens>;
    findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
}
export { UsersTokenRepositoryInMemory };
//# sourceMappingURL=UsersTokenRepositoryInMemory.d.ts.map