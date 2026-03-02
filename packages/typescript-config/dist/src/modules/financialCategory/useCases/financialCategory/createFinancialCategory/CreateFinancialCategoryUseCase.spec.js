"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const AppError_1 = require("@shared/error/AppError");
const CreateFinancialCategoryUseCase_1 = require("./CreateFinancialCategoryUseCase");
let financialCategoriesRepositoryInMemory;
let createFinancialCategoryUseCase;
describe('[FinancialCategory] - Create a new financial category', () => {
    beforeEach(() => {
        financialCategoriesRepositoryInMemory =
            new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
        createFinancialCategoryUseCase = new CreateFinancialCategoryUseCase_1.CreateFinancialCategoryUseCase(financialCategoriesRepositoryInMemory);
    });
    it('should be able to create a new financial category', async () => {
        const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Description Test',
            userId: 'userId',
        });
        await createFinancialCategoryUseCase.execute(financialCategory);
        const { description } = financialCategory;
        const financialCategoryCreated = await financialCategoriesRepositoryInMemory.findByDescription(description);
        expect(financialCategoryCreated).toBeDefined();
        expect(financialCategoryCreated === null || financialCategoryCreated === void 0 ? void 0 : financialCategoryCreated.description).toEqual(financialCategory.description);
    });
    it('should not be able to create a new financial category with same name another', async () => {
        const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Description Test',
            userId: 'userId',
        });
        await createFinancialCategoryUseCase.execute(financialCategory);
        await expect(createFinancialCategoryUseCase.execute(financialCategory)).rejects.toEqual(new AppError_1.AppError('Financial Category description already exists', 400));
    });
});
//# sourceMappingURL=CreateFinancialCategoryUseCase.spec.js.map