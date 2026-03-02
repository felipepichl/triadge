"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserTokens_1 = require("./UserTokens");
describe('[Account] - Create a new UserTokens', () => {
    it('should be able to create a new instance of userTokens', () => {
        const userTokens = UserTokens_1.UserTokens.createUserTokens({
            userId: 'userId',
            expiresDate: new Date(),
            refreshToken: 'refreshToken',
        });
        expect(userTokens instanceof UserTokens_1.UserTokens).toBe(true);
        expect(userTokens).toBeTruthy();
        expect(userTokens.userId).toBe('userId');
    });
});
//# sourceMappingURL=UserTokens.spec.js.map