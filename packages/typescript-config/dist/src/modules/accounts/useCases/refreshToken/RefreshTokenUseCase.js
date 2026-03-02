"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const auth_1 = require("@config/auth");
const UserTokens_1 = require("@modules/accounts/domain/UserTokens");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
const { secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays } = auth_1.authConfig;
let RefreshTokenUseCase = class RefreshTokenUseCase {
    constructor(tokenProvider, usersTokensRepository, dateProvider) {
        this.tokenProvider = tokenProvider;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ token }) {
        const { sub: userId, email } = this.tokenProvider.decodeToken(token, secretRefreshToken);
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token);
        if (!userToken) {
            throw new AppError_1.AppError('Refresh Token does not exists');
        }
        await this.usersTokensRepository.deleteById(userToken.id.toString());
        const refreshToken = this.tokenProvider.encodeToken({
            sub: userId.toString(),
            email,
        }, secretRefreshToken, expiresInRefreshToken);
        const refreshTokenExpiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);
        const userTokens = UserTokens_1.UserTokens.createUserTokens({
            userId: userId.toString(),
            expiresDate: refreshTokenExpiresDate,
            refreshToken,
        });
        await this.usersTokensRepository.create(userTokens);
        return {
            refreshToken,
        };
    }
};
exports.RefreshTokenUseCase = RefreshTokenUseCase;
exports.RefreshTokenUseCase = RefreshTokenUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TokenProvider')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], RefreshTokenUseCase);
//# sourceMappingURL=RefreshTokenUseCase.js.map