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
        description: 'Financial Category Test',
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
        description: 'Description',
        detail: 'Detail',
        type: 'income',
        amount: 100,
        financialCategoryId,
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/transactions')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description',
        detail: 'Detail',
        type: 'outcome',
        amount: 50,
        financialCategoryId,
    });
}
describe('[E2E] - List all Transactions', () => {
    let token;
    let financialCategoryId;
    beforeEach(async () => {
        token = await authenticateUser();
        financialCategoryId = await createFinancialCategoy(token);
        await createTransaction(financialCategoryId, token);
    });
    it('should be to list all categories', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/transactions')
            .set({ Authorization: `Bearer ${token}` });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.transactions)).toBe(true);
        expect(response.body.transactions.length).toBe(2);
    });
});
//# sourceMappingURL=ListAllTransactionController.e2e-spec.js.map