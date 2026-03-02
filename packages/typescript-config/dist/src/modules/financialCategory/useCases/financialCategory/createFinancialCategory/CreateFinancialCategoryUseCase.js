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
exports.CreateFinancialCategoryUseCase = void 0;
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const AppError_1 = require("@shared/error/AppError");
const tsyringe_1 = require("tsyringe");
let CreateFinancialCategoryUseCase = class CreateFinancialCategoryUseCase {
    constructor(financialCategoriesRepository) {
        this.financialCategoriesRepository = financialCategoriesRepository;
    }
    async execute({ description, userId }) {
        const descriptionAlreadyExists = await this.financialCategoriesRepository.findByDescription(description);
        if (descriptionAlreadyExists) {
            throw new AppError_1.AppError('Financial Category description already exists', 400);
        }
        const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description,
            userId,
        });
        await this.financialCategoriesRepository.create(financialCategory);
    }
};
exports.CreateFinancialCategoryUseCase = CreateFinancialCategoryUseCase;
exports.CreateFinancialCategoryUseCase = CreateFinancialCategoryUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('FinancialCategoriesRepository')),
    __metadata("design:paramtypes", [Object])
], CreateFinancialCategoryUseCase);
//# sourceMappingURL=CreateFinancialCategoryUseCase.js.map