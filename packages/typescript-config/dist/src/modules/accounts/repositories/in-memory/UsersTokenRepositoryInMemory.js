"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTokenRepositoryInMemory = void 0;
class UsersTokenRepositoryInMemory {
    constructor() {
        this.usersTokens = [];
    }
    async create(userTokens) {
        this.usersTokens.push(userTokens);
        return this.usersTokens[0];
    }
    async findByUserIdAndRefreshToken(userId, refreshToken) {
        return this.usersTokens.find((userTokens) => userTokens.userId === userId &&
            userTokens.refreshToken === refreshToken);
    }
    async deleteById(id) {
        const index = this.usersTokens.findIndex((userTokens) => userTokens.id.toString() === id);
        this.usersTokens.splice(index);
    }
}
exports.UsersTokenRepositoryInMemory = UsersTokenRepositoryInMemory;
//# sourceMappingURL=UsersTokenRepositoryInMemory.js.map