"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@modules/accounts/domain/User");
const HashProviderInMemory_1 = require("@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const AppError_1 = require("@shared/error/AppError");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
let usersRepositoryInMemory;
let hashProviderInMemory;
let createUserUseCase;
describe('[Account] - Create a user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory_1.HashProviderInMemory();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory, hashProviderInMemory);
    });
    it('should be able to create a new user', async () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        await createUserUseCase.execute(user);
        const { email } = user;
        const userCreated = await usersRepositoryInMemory.findByEmail(email);
        expect(userCreated).toBeDefined();
        expect(userCreated === null || userCreated === void 0 ? void 0 : userCreated.email).toEqual(user.email);
    });
    it('should not be able to create a new user with same email another', async () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        await createUserUseCase.execute(user);
        await expect(createUserUseCase.execute(user)).rejects.toEqual(new AppError_1.AppError('Users already exists', 400));
    });
});
//# sourceMappingURL=CreateUserUseCase.spec.js.map