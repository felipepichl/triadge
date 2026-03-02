"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/start/app");
const supertest_1 = __importDefault(require("supertest"));
async function createUser(name, email, password, phoneNumber) {
    await (0, supertest_1.default)(app_1.app).post('/users').send({
        name,
        email,
        password,
        phoneNumber,
    });
}
async function authenticateUser() {
    await (0, supertest_1.default)(app_1.app).post('/users').send({
        name: 'Jonh Due',
        email: 'johndue@example.com',
        password: 'hash123',
        phoneNumber: '51999999999',
    });
    const response = await (0, supertest_1.default)(app_1.app).post('/sessions').send({
        email: 'johndue@example.com',
        password: 'hash123',
    });
    const { token } = response.body;
    return token;
}
describe('[E2E] = List all Users', () => {
    beforeAll(async () => {
        await createUser('User First', 'user1@example.com', 'hash123', '51999999999');
        await createUser('User Second', 'user2@example.com', 'hash123', '51999999999');
        await createUser('User Third', 'user3@example.com', 'hash123', '51999999999');
    });
    it('should be able to list all users', async () => {
        const token = await authenticateUser();
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/users')
            .set({
            Authorization: `Bearer ${token}`,
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.users)).toBe(true);
        expect(response.body.users.length).toBe(4);
    });
});
//# sourceMappingURL=ListAllController.e2e-spec.js.map