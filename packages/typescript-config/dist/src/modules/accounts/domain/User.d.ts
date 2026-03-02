import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
interface IUserProps {
    id?: string;
    name: string;
    email?: string;
    password?: string;
    phoneNumber: string;
    avatar?: string;
}
declare class User extends AggregateRoot<IUserProps> {
    constructor(props: IUserProps, id?: UniqueEntityID);
    get name(): string;
    get email(): string;
    get password(): string;
    get avatar(): string;
    get phoneNumber(): string;
    static createUser({ id, name, email, password, phoneNumber, avatar, }: IUserProps): User;
    updateAvatar(avatar: string): void;
}
export { User };
//# sourceMappingURL=User.d.ts.map