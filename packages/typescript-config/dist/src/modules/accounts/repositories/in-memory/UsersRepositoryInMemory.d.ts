import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '../IUsersRepository';
declare class UsersRepositoryInMemory implements IUsersRepository {
    private users;
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
    findById(userId: string): Promise<User>;
    findByIds(userIds: string[]): Promise<User[]>;
    listAll(): Promise<User[]>;
}
export { UsersRepositoryInMemory };
//# sourceMappingURL=UsersRepositoryInMemory.d.ts.map