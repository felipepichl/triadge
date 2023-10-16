import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IUserTokensProps {
  userId: string
  expiresDate?: Date
  refreshToken?: string
}

class UserTokens extends AggregateRoot<IUserTokensProps> {
  constructor(props: IUserTokensProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get userId(): string {
    return this.props.userId
  }

  get expiresDate(): Date {
    return this.props.expiresDate
  }

  get refreshToken(): string {
    return this.props.refreshToken
  }

  public static createUserTokens({
    userId,
    expiresDate,
    refreshToken,
  }: IUserTokensProps): UserTokens {
    const userTokensProps = {
      userId,
      expiresDate,
      refreshToken,
    }

    return AggregateRoot.create({ props: userTokensProps }, UserTokens)
  }
}

export { UserTokens }
