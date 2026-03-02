"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/start/app");
const supertest_1 = __importDefault(require("supertest"));
describe('[E2E] = Authenticate User', () => {
    beforeAll(async () => {
        await (0, supertest_1.default)(app_1.app).post('/users').send({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
    });
    it('should be able to authenticate an user', async () => {
        const responseToken = await (0, supertest_1.default)(app_1.app).post('/sessions').send({
            email: 'johndue@example.com',
            password: 'hash123',
        });
        expect(responseToken.status).toBe(200);
        expect(responseToken.body).toHaveProperty('token');
    });
});
//# sourceMappingURL=AuthenticateUserController.e2e-spec.js.map