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
}
describe('[E2E] - List all stocks by type', () => {
    let token;
    const type = 'stock';
    beforeEach(async () => {
        token = await authenticateUser();
        await createStock(token);
    });
    it('should be to list all stocks by type', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .get('/stocks/type')
            .set({ Authorization: `Bearer ${token}` })
            .query({ type });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.stocks)).toBe(true);
        expect(response.body.stocks.length).toBe(1);
    });
});
//# sourceMappingURL=ListByTypeController.e2e-spec.js.map