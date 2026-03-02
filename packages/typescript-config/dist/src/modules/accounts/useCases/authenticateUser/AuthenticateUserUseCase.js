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
exports.AuthenticateUserUseCase = void 0;
const auth_1 = require("@config/auth");
const UserTokens_1 = require("@modules/accounts/domain/UserTokens");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
const { secretToken, expiresInToken, secretRefreshToken, expiresInRefreshToken, expiresRefreshTokenDays, } = auth_1.authConfig;
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(usersRepository, hashProvider, tokenProvider, usersTokensRepository, dateProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.tokenProvider = tokenProvider;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ email, password }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError_1.AppError('Incorret email/password combination');
        }
        const passwordMatch = await this.hashProvider.compareHash(password, user.password);
        if (!passwordMatch) {
            throw new AppError_1.AppError('Incorret email/password combination');
        }
        const { id, name } = user;
        const token = this.tokenProvider.encodeToken({
            sub: id.toString(),
            email,
        }, secretToken, expiresInToken);
        const refreshToken = this.tokenProvider.encodeToken({
            sub: id.toString(),
            email,
        }, secretRefreshToken, expiresInRefreshToken);
        const refreshTokenExpiresDate = this.dateProvider.addDays(expiresRefreshTokenDays);
        const userTokens = UserTokens_1.UserTokens.createUserTokens({
            userId: id.toString(),
            expiresDate: refreshTokenExpiresDate,
            refreshToken,
        });
        await this.usersTokensRepository.create(userTokens);
        const returnResponse = {
            user: {
                name,
                email,
            },
            token,
            refreshToken,
        };
        return returnResponse;
    }
};
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
exports.AuthenticateUserUseCase = AuthenticateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('HashProvider')),
    __param(2, (0, tsyringe_1.inject)('TokenProvider')),
    __param(3, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(4, (0, tsyringe_1.inject)('DateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AuthenticateUserUseCase);
//# sourceMappingURL=AuthenticateUserUseCase.js.map