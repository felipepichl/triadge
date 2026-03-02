"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByMonthUseCase = void 0;
const transactions_utils_1 = require("@modules/transactions/utils/transactions-utils");
const tsyringe_1 = require("tsyringe");
let ListByMonthUseCase = class ListByMonthUseCase {
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    async execute({ userId, month }) {
        const transactions = await this.transactionsRepository.listByMonth(userId, month);
        const { income, outcome } = (0, transactions_utils_1.calculateTransactionTotals)(transactions);
        const total = income - outcome;
        return {
            transactions,
            balance: {
                income,
                outcome,
                total,
            },
        };
    }
};
exports.ListByMonthUseCase = ListByMonthUseCase;
exports.ListByMonthUseCase = ListByMonthUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TransactionsRepository')),
    __metadata("design:paramtypes", [Object])
], ListByMonthUseCase);
//# sourceMappingURL=ListByMonthUseCase.js.map