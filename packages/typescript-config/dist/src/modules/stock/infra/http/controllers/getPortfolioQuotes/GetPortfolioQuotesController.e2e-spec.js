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
async function buyStock(token) {
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks/buy')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol: 'PETR4',
        price: 25,
        quantity: 3,
        type: 'stock',
    });
}
describe('[E2E] - Get user portifolio with total invested and current value', () => {
    let token;
    const type = 'stock';
    beforeEach(async () => {
        token = await authenticateUser();
        await buyStock(token);
    });
    it('should be able to get user portifolio with invested and current value', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/portfolio')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(response.body.portfolio[0].stock.symbol).toBe('PETR4');
        expect(response.body.portfolio.length).toBe(1);
    });
});
//# sourceMappingURL=GetPortfolioQuotesController.e2e-spec.js.map