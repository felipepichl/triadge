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
describe('[E2E] - Buy a new stock', () => {
    let token;
    beforeEach(async () => {
        token = await authenticateUser();
    });
    it('should be to buy a new stock', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/stocks/buy')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            symbol: 'LIFE11',
            price: 25,
            quantity: 1,
            type: 'fii',
        });
        expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=BuyController.e2e-spec.js.map