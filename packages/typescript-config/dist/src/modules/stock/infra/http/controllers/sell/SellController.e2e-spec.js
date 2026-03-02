"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@shared/infra/http/start/app");
const prisma_1 = require("@shared/infra/prisma");
const bcrypt_1 = require("bcrypt");
const supertest_1 = __importDefault(require("supertest"));
async function createUser() {
    await prisma_1.PrismaSingleton.getInstance().user.create({
        data: {
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: await (0, bcrypt_1.hash)('hash123', 8),
            phoneNumber: '51999999999',
        },
    });
    const result = await prisma_1.PrismaSingleton.getInstance().user.findUnique({
        where: { email: 'johndue@example.com' },
    });
    const { id } = result;
    return id;
}
async function createStockAndPosition(userId) {
    await prisma_1.PrismaSingleton.getInstance().stock.create({
        data: {
            shortName: 'short name',
            symbol: 'SYMB11',
            price: 7,
            date: new Date(),
            quantity: 10,
            type: 'stock',
            userId,
        },
    });
    await prisma_1.PrismaSingleton.getInstance().stockPosition.create({
        data: {
            symbol: 'SYMB11',
            quantity: 10,
            type: 'stock',
            avgPrice: 10,
            userId,
        },
    });
}
async function authenticateUser() {
    const response = await (0, supertest_1.default)(app_1.app).post('/sessions').send({
        email: 'johndue@example.com',
        password: 'hash123',
    });
    const { token } = response.body;
    return token;
}
describe('[E2E] - Sell stocks', () => {
    let token;
    beforeEach(async () => {
        const userId = await createUser();
        await createStockAndPosition(userId);
        token = await authenticateUser();
    });
    it('should be to sell stocks', async () => {
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/stocks/sell')
            .set({ Authorization: `Bearer ${token}` })
            .send({
            symbol: 'SYMB11',
            price: 5,
            quantity: 2,
            type: 'stock',
        });
        expect(response.status).toBe(201);
    });
});
//# sourceMappingURL=SellController.e2e-spec.js.map