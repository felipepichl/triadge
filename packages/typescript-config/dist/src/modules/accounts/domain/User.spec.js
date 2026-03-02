"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
describe('[Account] - Create a new User', () => {
    it('should be able to create a new instance of user', () => {
        const user = User_1.User.createUser({
            name: 'Jonh Due',
            email: 'johndue@example.com',
            password: 'hash123',
            phoneNumber: '51999999999',
        });
        expect(user instanceof User_1.User).toBe(true);
        expect(user).toBeTruthy();
    });
});
//# sourceMappingURL=User.spec.js.map