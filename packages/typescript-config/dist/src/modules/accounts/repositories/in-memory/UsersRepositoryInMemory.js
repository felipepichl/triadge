"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryInMemory = void 0;
class UsersRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    async create(user) {
        this.users.push(user);
    }
    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
    async findByPhoneNumber(phoneNumber) {
        return this.users.find((user) => user.phoneNumber === phoneNumber);
    }
    async findById(userId) {
        const user = this.users.find((user) => user.id.toString() === userId);
        return user;
    }
    async findByIds(userIds) {
        return this.users.filter((user) => userIds.includes(user.id.toString()));
    }
    async listAll() {
        return this.users;
    }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
//# sourceMappingURL=UsersRepositoryInMemory.js.map