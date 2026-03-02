"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/start/app");
const prisma_1 = require("@shared/infra/prisma");
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
async function createAccountPaybale() {
    const token = await authenticateUser();
    const financialCategoryId = await createFinancialCategory();
    await (0, supertest_1.default)(app_1.app)
        .post('/accounts-payable')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description Account Payable 1',
        amount: 1000,
        dueDate: new Date('2025-01-02'),
        financialCategoryId,
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/accounts-payable')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        description: 'Description Account Payable 2',
        amount: 500,
        dueDate: new Date('2025-01-02'),
        financialCategoryId,
    });
}
async function getAccountPayable() {
    const result = await prisma_1.PrismaSingleton.getInstance().accountPayable.findFirst({
        where: { description: 'Description Account Payable 1' },
    });
    return result;
}
describe('[E2E] - Update amount variable to account payable', () => {
    let token;
    beforeEach(async () => {
        token = await authenticateUser();
        await createAccountPaybale();
    });
    it('should be able to update amount variable to account payable', async () => {
        const { id } = await getAccountPayable();
        const response = await (0, supertest_1.default)(app_1.app)
            .patch(`/accounts-payable/${id}/amount-variable`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
            amount: 2000,
        });
        const { amount } = await getAccountPayable();
        expect(response.status).toBe(201);
        expect(Number(amount)).toBe(2000);
    });
});
//# sourceMappingURL=UpdateAmountVariableController.e2e-spec.js.map