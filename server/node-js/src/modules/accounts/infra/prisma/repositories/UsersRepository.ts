import { User } from '@modules/accounts/domain/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { UserMappers } from '../mappers/UserMappers'

class UsersRepository implements IUsersRepository {
  async create({
    id,
    name,
    email,
    password,
    phoneNumber,
    avatar,
  }: User): Promise<void> {
    const data = {
      name,
      email,
      password,
      phoneNumber,
      avatar,
    }

    await PrismaSingleton.getInstance().user.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async findByEmail(email: string): Promise<User> {
    const result = await PrismaSingleton.getInstance().user.findFirst({
      where: { email },
    })

    if (!result) {
      return null
    }

    return UserMappers.getMapper().toDomain(result)
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const result = await PrismaSingleton.getInstance().user.findFirst({
      where: { phoneNumber },
    })

    if (!result) {
      return null
    }

    return UserMappers.getMapper().toDomain(result)
  }

  async findById(userId: string): Promise<User> {
    const result = await PrismaSingleton.getInstance().user.findFirst({
      where: { id: userId },
    })

    if (!result) {
      return null
    }

    return UserMappers.getMapper().toDomain(result)
  }

  async findByIds(userIds: string[]): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    })

    return UserMappers.getMapper().toDomainArray(result)
  }

  async listAll(): Promise<User[]> {
    const result = await PrismaSingleton.getInstance().user.findMany()

    return UserMappers.getMapper().toDomainArray(result)
  }
}

export { UsersRepository }
