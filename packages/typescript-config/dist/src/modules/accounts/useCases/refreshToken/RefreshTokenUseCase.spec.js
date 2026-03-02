"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserTokens_1 = require("@modules/accounts/domain/UserTokens");
const TokenProviderInMemory_1 = require("@modules/accounts/providers/TokenProvider/in-memory/TokenProviderInMemory");
const UsersTokenRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
const DateProviderInMemory_1 = require("@shared/container/providers/DateProvider/in-memory/DateProviderInMemory");
const AppError_1 = require("@shared/error/AppError");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
let refreshTokenUseCase;
let usersTokensRepository;
let tokenProviderInMemory;
let dateProvider;
describe('[Account] - Refresh Token', () => {
    beforeAll(() => {
        usersTokensRepository = new UsersTokenRepositoryInMemory_1.UsersTokenRepositoryInMemory();
        tokenProviderInMemory = new TokenProviderInMemory_1.TokenProviderInMemory();
        dateProvider = new DateProviderInMemory_1.DateProviderInMemory();
        refreshTokenUseCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(tokenProviderInMemory, usersTokensRepository, dateProvider);
    });
    it('should be able to create a new refreshtoken', async () => {
        const userToken = UserTokens_1.UserTokens.createUserTokens({
            userId: 'userId',
            expiresDate: new Date(),
            refreshToken: tokenProviderInMemory.encodeToken({
                email: 'user@example.com',
                sub: 'userId',
            }, 'secret', 'expiresIn'),
        });
        const userTokenCreated = await usersTokensRepository.create(userToken);
        const { refreshToken } = userTokenCreated;
        const response = await refreshTokenUseCase.execute({
            token: refreshToken,
        });
        expect(response).toHaveProperty('refreshToken');
        expect(typeof response.refreshToken).toBe('string');
    });
    it('should handle invalid refresh token', async () => {
        await expect(refreshTokenUseCase.execute({
            token: 'invalidToken',
        })).rejects.toEqual(new AppError_1.AppError('Refresh Token does not exists', 400));
    });
});
//# sourceMappingURL=RefreshTokenUseCase.spec.js.map