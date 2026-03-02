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
async function createFinancialCategory() {
    const token = await authenticateUser();
    await (0, supertest_1.default)(app_1.app)
        .post('/financial-category')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Financial Category Description',
    });
    const response = await (0, supertest_1.default)(app_1.app)
        .get('/financial-category')
        .set({ Authorization: `Bearer ${token}` });
    const { financialCategories } = response.body;
    const { _id } = financialCategories[0];
    return _id;
}
async function createSubcategory(parentCategoryId) {
    const token = await authenticateUser();
    await (0, supertest_1.default)(app_1.app)
        .post('/financial-category/subcategory')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Subcategory',
        parentCategoryId,
    });
    const response = await (0, supertest_1.default)(app_1.app)
        .get(`/financial-category/subcategory/${parentCategoryId}`)
        .set({ Authorization: `Bearer ${token}` });
    const { _id } = response.body.subcategories[0];
    return _id;
}
async function createFixedAccountPaybale() {
    const token = await authenticateUser();
    const financialCategoryId = await createFinancialCategory();
    const subcategoryId = await createSubcategory(financialCategoryId);
    await (0, supertest_1.default)(app_1.app)
        .post('/accounts-payable/fixed')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description Account Payable 1',
        amount: 1000,
        dueDate: new Date('2025-01-02'),
        financialCategoryId,
        subcategoryId,
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/accounts-payable/fixed')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description Account Payable 2',
        amount: 500,
        dueDate: new Date('2025-01-02'),
        financialCategoryId,
        subcategoryId,
    });
}
describe('[E2E] - List all fixed accounts payable by month', () => {
    let token;
    beforeEach(async () => {
        token = await authenticateUser();
        await createFixedAccountPaybale();
    });
    it('should be able to list all fixed accounts by month', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/accounts-payable/fixed/month')
            .set({ Authorization: `Bearer ${token}` })
            .query({ month: 1 });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.fixedAccountsPayable)).toBe(true);
        expect(response.body.fixedAccountsPayable.length).toBe(2);
    });
});
//# sourceMappingURL=ListAllFixedAccountsByMonthController.e2e-spec.js.map