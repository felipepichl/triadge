import { User } from '@modules/accounts/domain/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
declare class UsersRepository implements IUsersRepository {
    create({ id, name, email, password, phoneNumber, avatar, }: User): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
    findById(userId: string): Promise<User>;
    findByIds(userIds: string[]): Promise<User[]>;
    listAll(): Promise<User[]>;
}
export { UsersRepository };
//# sourceMappingURL=UsersRepository.d.ts.map