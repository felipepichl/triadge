import { AggregateRoot } from '@shared/core/domain/AggregateRoot';
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID';
interface IUserTokensProps {
    id?: string;
    userId: string;
    expiresDate?: Date;
    refreshToken?: string;
}
declare class UserTokens extends AggregateRoot<IUserTokensProps> {
    constructor(props: IUserTokensProps, id?: UniqueEntityID);
    get userId(): string;
    get expiresDate(): Date;
    get refreshToken(): string;
    static createUserTokens({ id, userId, expiresDate, refreshToken, }: IUserTokensProps): UserTokens;
}
export { UserTokens };
//# sourceMappingURL=UserTokens.d.ts.map