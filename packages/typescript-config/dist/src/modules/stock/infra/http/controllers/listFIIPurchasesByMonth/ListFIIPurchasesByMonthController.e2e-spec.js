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
async function createStock(token) {
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol: 'PETR4',
        price: 25,
        quantity: 1,
        type: 'stock',
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol: 'RZAK11',
        price: 88,
        date: new Date(2025, 7, 1),
        quantity: 2,
        type: 'fii',
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol: 'LIFE11',
        price: 88,
        date: new Date(2025, 7, 5),
        quantity: 2,
        type: 'fii',
    });
    await (0, supertest_1.default)(app_1.app)
        .post('/stocks')
        .set({ Authorization: `Bearer ${token}` })
        .send({
        symbol: 'LIFE11',
        price: 88,
        date: new Date('2025-07-05'),
        quantity: 2,
        type: 'fii',
    });
}
describe('[E2E] - List all fiis purcheses by month', () => {
    let token;
    const month = 8;
    beforeEach(async () => {
        token = await authenticateUser();
        await createStock(token);
    });
    it('should be to list all fiis purcheses by month', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/fii-purchases/by-month')
            .set({ Authorization: `Bearer ${token}` })
            .query({ month });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.stocks)).toBe(true);
        expect(response.body.stocks.length).toBe(2);
    });
});
//# sourceMappingURL=ListFIIPurchasesByMonthController.e2e-spec.js.map