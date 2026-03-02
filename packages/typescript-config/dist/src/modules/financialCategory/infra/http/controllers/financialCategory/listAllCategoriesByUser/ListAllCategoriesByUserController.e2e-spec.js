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
async function createCategoy(description, token) {
    await (0, supertest_1.default)(app_1.app)
        .post('/financial-category')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description,
    });
}
describe('[E2E] - List all Financial Categories', () => {
    let token;
    beforeEach(async () => {
        token = await authenticateUser();
        await createCategoy('Financial Category Test01', token);
        await createCategoy('Financial Category Test02', token);
    });
    it('should be to list all financial categories to authenticated user', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/financial-category')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.financialCategories)).toBe(true);
        expect(response.body.financialCategories.length).toBe(2);
    });
});
//# sourceMappingURL=ListAllCategoriesByUserController.e2e-spec.js.map