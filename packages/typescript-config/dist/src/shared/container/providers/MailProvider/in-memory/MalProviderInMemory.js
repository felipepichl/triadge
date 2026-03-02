"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MalProviderInMemory = void 0;
class MalProviderInMemory {
    constructor() {
        this.messages = [];
    }
    async sendMail(to, subject, body) {
        this.messages.push(`${to}-${subject}-${body}`);
    }
}
exports.MalProviderInMemory = MalProviderInMemory;
//# sourceMappingURL=MalProviderInMemory.js.map