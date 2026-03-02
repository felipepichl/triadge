"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokensMappers = void 0;
const UserTokens_1 = require("@modules/accounts/domain/UserTokens");
class UserTokensMappers {
    toPersistence(usertokens) {
        return usertokens;
    }
    toDomain(raw) {
        return UserTokens_1.UserTokens.createUserTokens(raw);
    }
    toDomainArray(rawUserTokens) {
        return rawUserTokens.map(this.toDomain);
    }
    getMapper() {
        return new UserTokensMappers();
    }
    static getMapper() {
        return new UserTokensMappers();
    }
}
exports.UserTokensMappers = UserTokensMappers;
//# sourceMappingURL=UserTokensMappers.js.map