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
async function getParentCategoryId(token) {
    const response = await (0, supertest_1.default)(app_1.app)
        .get('/financial-category')
        .set({ Authorization: `Bearer ${token}` });
    const { _id } = response.body.financialCategories[0];
    return _id;
}
describe('[E2E] - Create subcategory to financial category', () => {
    let token;
    let parentCategoryId;
    beforeEach(async () => {
        token = await authenticateUser();
        await createCategoy('Financial Category Test01', token);
        await createCategoy('Financial Category Test02', token);
        parentCategoryId = await getParentCategoryId(token);
    });
    it('should be to create a new subcategory to financial category', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/financial-category/subcategory')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            description: 'Subcategory',
            parentCategoryId,
        });
        expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=CreateSubcategoryController.e2e-spec.js.map