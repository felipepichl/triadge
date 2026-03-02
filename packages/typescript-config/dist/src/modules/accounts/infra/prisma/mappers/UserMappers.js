"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMappers = void 0;
const User_1 = require("@modules/accounts/domain/User");
class UserMappers {
    toPersistence(user) {
        return user;
    }
    toDomain(raw) {
        return User_1.User.createUser(raw);
    }
    toDomainArray(rawUsers) {
        return rawUsers.map(this.toDomain);
    }
    getMapper() {
        return UserMappers.getMapper();
    }
    static getMapper() {
        return new UserMappers();
    }
}
exports.UserMappers = UserMappers;
//# sourceMappingURL=UserMappers.js.map