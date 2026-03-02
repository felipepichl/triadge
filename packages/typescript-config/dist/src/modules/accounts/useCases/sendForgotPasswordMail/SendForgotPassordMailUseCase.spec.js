"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("@modules/accounts/domain/User");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UsersTokenRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
const DateProviderInMemory_1 = require("@shared/container/providers/DateProvider/in-memory/DateProviderInMemory");
const MalProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MalProviderInMemory");
const SendForgotPassordMailUseCase_1 = require("./SendForgotPassordMailUseCase");
let sendForgotPassordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProviderInMemory;
let mailProviderInMemory;
describe('[Account] - Send Forgot Password Mail Use Case', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory_1.UsersTokenRepositoryInMemory();
        dateProviderInMemory = new DateProviderInMemory_1.DateProviderInMemory();
        mailProviderInMemory = new MalProviderInMemory_1.MalProviderInMemory();
        sendForgotPassordMailUseCase = new SendForgotPassordMailUseCase_1.SendForgotPassordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProviderInMemory, mailProviderInMemory);
    });
    it('should be able to send a forgot password email', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
        const user = User_1.User.createUser({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            phoneNumber: '',
        });
        await usersRepositoryInMemory.create(user);
        await sendForgotPassordMailUseCase.execute({
            email: 'johndoe@example.com',
        });
        expect(sendMail).toHaveBeenCalled();
    });
    it('should not be able to send an email if user does not exist', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
        const recoveryEmail = 'nonexistentuser@example.com';
        const result = await sendForgotPassordMailUseCase.execute({
            email: recoveryEmail,
        });
        expect(result).toEqual({
            message: `If the provided ${recoveryEmail} is associated with an account, a recovery email will be sent.`,
        });
        expect(sendMail).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=SendForgotPassordMailUseCase.spec.js.map