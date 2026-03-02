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
async function createFinancialCategoy(token) {
    await (0, supertest_1.default)(app_1.app)
        .post('/financial-category')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Category Test',
    });
    const response = await (0, supertest_1.default)(app_1.app)
        .get('/financial-category')
        .set({ Authorization: `Bearer ${token}` });
    const { _id } = response.body.financialCategories[0];
    return _id;
}
async function createTransaction(financialCategoryId, token) {
    await (0, supertest_1.default)(app_1.app)
        .post('/transactions')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description 1',
        detail: 'Detail',
        type: 'income',
        amount: 100,
        financialCategoryId,
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/transactions')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description 2',
        detail: 'Detail',
        type: 'outcome',
        amount: 50,
        financialCategoryId,
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/transactions')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description 3',
        detail: 'Detail',
        type: 'outcome',
        amount: 50,
        financialCategoryId,
    });
}
describe('[E2E] - List all Transactions by type', () => {
    let token;
    let financialCategoryId;
    const type = 'outcome';
    beforeEach(async () => {
        token = await authenticateUser();
        financialCategoryId = await createFinancialCategoy(token);
        await createTransaction(financialCategoryId, token);
    });
    it('should be to list all transactions by type', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/transactions/type')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.transactions)).toBe(true);
        expect(response.body.transactions.length).toBe(2);
    });
});
//# sourceMappingURL=ListByTypeController.e2e-spec.js.map