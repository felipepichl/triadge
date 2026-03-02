"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const User_1 = require("@modules/accounts/domain/User");
const HashProviderInMemory_1 = require("@modules/accounts/providers/HashProvider/in-memory/HashProviderInMemory");
const TokenProviderInMemory_1 = require("@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UsersTokenRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const DateProviderInMemory_1 = require("@shared/container/providers/DateProvider/in-memory/DateProviderInMemory");
const AppError_1 = require("@shared/error/AppError");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
let usersRepositoryInMemory;
let hashProviderInMemory;
let tokenProviderInMemory;
let dateProviderInMemory;
let userTokensInMemory;
let createUserUseCase;
let authenticateUserUseCase;
describe('[Account] - Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory_1.HashProviderInMemory();
        tokenProviderInMemory = new TokenProviderInMemory_1.TokenProviderInMemory();
        dateProviderInMemory = new DateProviderInMemory_1.DateProviderInMemory();
        userTokensInMemory = new UsersTokenRepositoryInMemory_1.UsersTokenRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory, hashProviderInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, hashProviderInMemory, tokenProviderInMemory, userTokensInMemory, dateProviderInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        await createUserUseCase.execute(user);
        const { email, password } = user;
        const response = await authenticateUserUseCase.execute({
            email,
            password,
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toBeDefined();
        expect(response.user.email).toEqual(email);
        expect(response.refreshToken).toBeDefined();
    });
    it('should not be able to authenticate with non existing user', async () => {
        await expect(authenticateUserUseCase.execute({
            email: 'non_existing@example.com',
            password: 'hash123',
        })).rejects.toEqual(new AppError_1.AppError('Incorret email/password combination'));
    });
    it('should not be able to authenticate with wrong password', async () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        await createUserUseCase.execute(user);
        const { email } = user;
        await expect(authenticateUserUseCase.execute({
            email,
            password: 'wrong-password',
        })).rejects.toEqual(new AppError_1.AppError('Incorret email/password combination'));
    });
});
//# sourceMappingURL=AuthenticateUserUseCase.spec.js.map