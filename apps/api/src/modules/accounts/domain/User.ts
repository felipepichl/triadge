import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IUserProps {
  id?: string
  name: string
  email?: string
  password?: string
  phoneNumber: string
  avatar?: string
}

class User extends AggregateRoot<IUserProps> {
  constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get email(): string {
    return this.props.email
  }

  get password(): string {
    return this.props.password
  }

  get avatar(): string {
    return this.props.avatar
  }

  get phoneNumber(): string {
    return this.props.phoneNumber
  }

  public static createUser({
    id,
    name,
    email,
    password,
    phoneNumber,
    avatar,
  }: IUserProps): User {
    const userProps = {
      name,
      email,
      password,
      phoneNumber,
      avatar,
    }

    return AggregateRoot.create({ props: userProps, id }, User)
  }

  public updateAvatar(avatar: string): void {
    this.props.avatar = avatar
  }
}

export { User }
