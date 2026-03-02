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
exports.CreateAccountPayableUseCase = void 0;
const AccountPayable_1 = require("@modules/accountPayable/domain/AccountPayable");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let CreateAccountPayableUseCase = class CreateAccountPayableUseCase {
    constructor(accountsPayableRepository) {
        this.accountsPayableRepository = accountsPayableRepository;
    }
    async execute({ description, amount, dueDate, userId, financialCategoryId, subcategoryId, installments = 1, }) {
        const initialDueDate = new Date(dueDate);
        if (installments <= 0) {
            throw new AppError_1.AppError('The number of installments must be greater than zero.');
        }
        const installmentAmount = amount / installments;
        const accounts = [];
        for (let i = 0; i < installments; i++) {
            const nextDueDate = new Date(dueDate);
            nextDueDate.setMonth(nextDueDate.getMonth() + i);
            if (nextDueDate.getDate() !== initialDueDate.getDate()) {
                nextDueDate.setDate(0);
            }
            const accountPayable = AccountPayable_1.AccountPayable.createAccountPayable({
                description: `${description}${installments > 1 ? ` ${i + 1}/${installments}` : ''}`,
                amount: installmentAmount,
                dueDate: nextDueDate,
                userId,
                financialCategoryId,
                subcategoryId,
            });
            accounts.push(accountPayable);
        }
        await this.accountsPayableRepository.createMany(accounts);
    }
};
exports.CreateAccountPayableUseCase = CreateAccountPayableUseCase;
exports.CreateAccountPayableUseCase = CreateAccountPayableUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AccountsPayableRepository')),
    __metadata("design:paramtypes", [Object])
], CreateAccountPayableUseCase);
//# sourceMappingURL=CreateAccountPayableUseCase.js.map