"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/start/app");
const supertest_1 = __importDefault(require("supertest"));
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
describe('[E2E] - Create Financial Category', () => {
    let token;
    beforeEach(async () => {
        token = await authenticateUser();
    });
    it('should be to create a new financial category', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/financial-category')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            description: 'Financial Category Description',
        });
        expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=CreateFinancialCategoryController.e2e-spec.js.map