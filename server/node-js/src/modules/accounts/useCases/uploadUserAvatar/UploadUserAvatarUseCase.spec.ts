import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { HashProviderInMemory } from '@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory'

import { StorageProviderInMemory } from '@shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'
import { UploadUserAvatarUseCase } from './UploadUserAvatarUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let hashProviderInMemory: HashProviderInMemory
let storageProvider: StorageProviderInMemory
let createUserUseCase: CreateUserUseCase
let uploadUserAvatarUseCase: UploadUserAvatarUseCase

describe('[Account] - Upload Avatar', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    hashProviderInMemory = new HashProviderInMemory()
    storageProvider = new StorageProviderInMemory()

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      hashProviderInMemory,
    )
    uploadUserAvatarUseCase = new UploadUserAvatarUseCase(
      usersRepositoryInMemory,
      storageProvider,
    )
  })

  it('should be able to upload an user avatar', async () => {
    const user = User.createUser({
      name: 'Jonh Due',
      email: 'johndue@example.com',
      password: 'hash123',
      phoneNumber: '51999999999',
    })

    await createUserUseCase.execute(user)

    const { email } = user

    const userCreated = await usersRepositoryInMemory.findByEmail(email)

    const { id } = userCreated

    await uploadUserAvatarUseCase.execute({
      userId: id.toString(),
      avatarFile: 'avatar.jpg',
    })

    expect(userCreated.avatar).toBe('avatar.jpg')
  })

  it('should be able to override existing avatar', async () => {
    const user = User.createUser({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
      phoneNumber: '123456789',
    })

    await usersRepositoryInMemory.create(user)

    const { id: userId } = user

    await uploadUserAvatarUseCase.execute({
      userId: userId.toString(),
      avatarFile: 'avatar1.jpg',
    })

    await uploadUserAvatarUseCase.execute({
      userId: userId.toString(),
      avatarFile: 'avatar2.jpg',
    })

    const updatedUser = await usersRepositoryInMemory.findById(
      userId.toString(),
    )

    expect(updatedUser.avatar).toBe('avatar2.jpg')
  })

  it('should be able to upload avatar a non-existing user', async () => {
    await expect(
      uploadUserAvatarUseCase.execute({
        userId: 'non-existing',
        avatarFile: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
