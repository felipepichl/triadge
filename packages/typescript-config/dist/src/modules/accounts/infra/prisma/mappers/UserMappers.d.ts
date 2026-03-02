import { User } from '@modules/accounts/domain/User';
import { User as RawUser } from '@prisma/client';
import { IMapper } from '@shared/core/infra/Mapper';
declare class UserMappers implements IMapper<User, RawUser> {
    toPersistence(user: User): User;
    toDomain(raw: RawUser): User;
    toDomainArray(rawUsers: RawUser[]): User[];
    getMapper(): IMapper<User, RawUser>;
    static getMapper(): UserMappers;
}
export { UserMappers };
//# sourceMappingURL=UserMappers.d.ts.map