"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const app_1 = require("@shared/infra/http/start/app");
const supertest_1 = __importDefault(require("supertest"));
describe('[E2E] = Update user avatar', () => {
    beforeEach(async () => {
        await (0, supertest_1.default)(app_1.app).post('/users').send({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
    });
    it('should be able to update an user avatar', async () => {
        const responseToken = await (0, supertest_1.default)(app_1.app).post('/sessions').send({
            email: 'johndue@example.com',
            password: 'hash123',
        });
        const { token } = responseToken.body;
        const getParentPath = (level, ...args) => (0, node_path_1.resolve)(__dirname, ...new Array(level).fill('..'), ...args);
        const avatarPath = getParentPath(7, 'temp', 'avatar', 'test', 'avatar.jpeg');
        const response = await (0, supertest_1.default)(app_1.app)
            .patch('/users/avatar')
            .attach('avatar', avatarPath)
            .set({
            Authorization: `Bearer ${token}`,
        });
        expect(response.status).toBe(204);
    });
});
//# sourceMappingURL=UploadUserAvatarController.e2e-spec.js.map