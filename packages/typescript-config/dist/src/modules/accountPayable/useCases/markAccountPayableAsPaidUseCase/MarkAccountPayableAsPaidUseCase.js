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
exports.MarkAccountPayableAsPaidUseCase = void 0;
const Transaction_1 = require("@modules/transactions/domain/transaction/Transaction");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let MarkAccountPayableAsPaidUseCase = class MarkAccountPayableAsPaidUseCase {
    constructor(accountsPayableRepository, transactionsRepository) {
        this.accountsPayableRepository = accountsPayableRepository;
        this.transactionsRepository = transactionsRepository;
    }
    async execute({ accountPayableId }) {
        const accountPayable = await this.accountsPayableRepository.findById(accountPayableId);
        if (!accountPayable) {
            throw new AppError_1.AppError('Account Payable not found');
        }
        if (accountPayable.isPaid) {
            throw new AppError_1.AppError('Account Payable is already paid');
        }
        const transaction = Transaction_1.Transaction.createTransaction({
            description: accountPayable.description,
            type: 'outcome',
            amount: accountPayable.amount,
            userId: accountPayable.userId,
            financialCategoryId: accountPayable.financialCategoryId,
            subcategoryId: accountPayable.subcategoryId,
        });
        await this.transactionsRepository.create(transaction);
        accountPayable.markAsPaid();
        await this.accountsPayableRepository.update(accountPayable);
    }
};
exports.MarkAccountPayableAsPaidUseCase = MarkAccountPayableAsPaidUseCase;
exports.MarkAccountPayableAsPaidUseCase = MarkAccountPayableAsPaidUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AccountsPayableRepository')),
    __param(1, (0, tsyringe_1.inject)('TransactionsRepository')),
    __metadata("design:paramtypes", [Object, Object])
], MarkAccountPayableAsPaidUseCase);
//# sourceMappingURL=MarkAccountPayableAsPaidUseCase.js.map