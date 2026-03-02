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
exports.SendForgotPassordMailUseCase = void 0;
const UserTokens_1 = require("@modules/accounts/domain/UserTokens");
const path_1 = require("path");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
let SendForgotPassordMailUseCase = class SendForgotPassordMailUseCase {
    constructor(usersRepository, usersTokensRepository, dateProvider, mailProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
        this.mailProvider = mailProvider;
    }
    async execute({ email }) {
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = (0, path_1.resolve)(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
        if (!user) {
            return {
                message: `If the provided ${email} is associated with an account, a recovery email will be sent.`,
            };
        }
        const { id } = user;
        const token = (0, uuid_1.v4)();
        const expiresDate = this.dateProvider.addHours(3);
        const userTokens = UserTokens_1.UserTokens.createUserTokens({
            userId: id.toString(),
            expiresDate,
            refreshToken: token,
        });
        await this.usersTokensRepository.create(userTokens);
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };
        await this.mailProvider.sendMail(email, 'Recuperação de Senha', variables, templatePath);
        return {
            message: `If the provided ${email} is associated with an account, a recovery email will be sent.`,
        };
    }
};
exports.SendForgotPassordMailUseCase = SendForgotPassordMailUseCase;
exports.SendForgotPassordMailUseCase = SendForgotPassordMailUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DateProvider')),
    __param(3, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotPassordMailUseCase);
//# sourceMappingURL=SendForgotPassordMailUseCase.js.map