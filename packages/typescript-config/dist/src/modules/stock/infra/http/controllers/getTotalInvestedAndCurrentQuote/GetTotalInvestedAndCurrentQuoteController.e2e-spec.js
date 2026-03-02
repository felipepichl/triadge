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
async function createStock(token, options) {
    const { symbol = 'PETR4', price = 21, quantity = 3, type = 'stock' } = options || {};
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks/buy')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol,
        price,
        quantity,
        type,
    });
}
describe('[E2E] - Get user total invested and current value', () => {
    let token;
    const type = 'stock';
    beforeEach(async () => {
        token = await authenticateUser();
        await createStock(token);
    });
    it('should be able to get user total invested and current value', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/investement')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(response.body.totalInvested).toBe(63);
        expect(response.body.currentValue).toBeDefined();
        expect(response.body.position).toBeDefined();
        const { totalInvested, currentValue, position } = response.body;
        expect(position).toBe(currentValue - totalInvested);
    });
    it('should calculate position with profit when current market prices are higher than purchase prices', async () => {
        const lowPrice = 10;
        await (0, supertest_1.default)(app_1.app)
            .post('/stocks/buy')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            symbol: 'VALE3',
            price: lowPrice,
            quantity: 10,
            type: 'stock',
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/investement')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(response.body.currentValue).toBeDefined();
        expect(response.body.position).toBeDefined();
        const { totalInvested, currentValue, position } = response.body;
        expect(position).toBe(currentValue - totalInvested);
        expect(typeof position).toBe('number');
    });
    it('should calculate position with loss when current market prices are lower than purchase prices', async () => {
        const highPrice = 100;
        await (0, supertest_1.default)(app_1.app)
            .post('/stocks/buy')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            symbol: 'ITUB4',
            price: highPrice,
            quantity: 5,
            type: 'stock',
        });
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/investement')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(response.body.currentValue).toBeDefined();
        expect(response.body.position).toBeDefined();
        const { totalInvested, currentValue, position } = response.body;
        expect(position).toBe(currentValue - totalInvested);
        expect(typeof position).toBe('number');
    });
});
//# sourceMappingURL=GetTotalInvestedAndCurrentQuoteController.e2e-spec.js.map