"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@modules/accounts/domain/User");
const HashProviderInMemory_1 = require("@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const StorageProviderInMemory_1 = require("@shared/container/providers/StorageProvider/in-memory/StorageProviderInMemory");
const AppError_1 = require("@shared/error/AppError");
const UploadUserAvatarUseCase_1 = require("./UploadUserAvatarUseCase");
let usersRepositoryInMemory;
let hashProviderInMemory;
let storageProvider;
let createUserUseCase;
let uploadUserAvatarUseCase;
describe('[Account] - Upload Avatar', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory_1.HashProviderInMemory();
        storageProvider = new StorageProviderInMemory_1.StorageProviderInMemory();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory, hashProviderInMemory);
        uploadUserAvatarUseCase = new UploadUserAvatarUseCase_1.UploadUserAvatarUseCase(usersRepositoryInMemory, storageProvider);
    });
    it('should be able to upload an user avatar', async () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        await createUserUseCase.execute(user);
        const { email } = user;
        const userCreated = await usersRepositoryInMemory.findByEmail(email);
        const { id } = userCreated;
        await uploadUserAvatarUseCase.execute({
            userId: id.toString(),
            avatarFile: 'avatar.jpg',
        });
        expect(userCreated.avatar).toBe('avatar.jpg');
    });
    it('should be able to override existing avatar', async () => {
        const user = User_1.User.createUser({
            name: 'Test User',
            email: 'user@test.com',
            password: '123456',
            phoneNumber: '123456789',
        });
        await usersRepositoryInMemory.create(user);
        const { id: userId } = user;
        await uploadUserAvatarUseCase.execute({
            userId: userId.toString(),
            avatarFile: 'avatar1.jpg',
        });
        await uploadUserAvatarUseCase.execute({
            userId: userId.toString(),
            avatarFile: 'avatar2.jpg',
        });
        const updatedUser = await usersRepositoryInMemory.findById(userId.toString());
        expect(updatedUser.avatar).toBe('avatar2.jpg');
    });
    it('should be able to upload avatar a non-existing user', async () => {
        await expect(uploadUserAvatarUseCase.execute({
            userId: 'non-existing',
            avatarFile: 'avatar.jpg',
        })).rejects.toBeInstanceOf(AppError_1.AppError);
    });
});
//# sourceMappingURL=UploadUserAvatarUseCase.spec.js.map