"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FinancialCategory_1 = require("@modules/financialCategory/domain/FinancialCategory");
const FinancialCategoriesRepositoryInMemory_1 = require("@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory");
const AppError_1 = require("@shared/error/AppError");
const CreateSubcategoryUseCase_1 = require("./CreateSubcategoryUseCase");
let financialCategoriesRepositoryInMemory;
let createSubcategoryUseCase;
describe('[FinancialCategory]/[Subcategory] - Create a new subcategory to financial category', () => {
    beforeEach(() => {
        financialCategoriesRepositoryInMemory =
            new FinancialCategoriesRepositoryInMemory_1.FinancialCategoriesRepositoryInMemory();
        createSubcategoryUseCase = new CreateSubcategoryUseCase_1.CreateSubcategoryUseCase(financialCategoriesRepositoryInMemory);
    });
    it('should be able to create a new  subcategory to financial category', async () => {
        const subcategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Description Test',
            userId: 'userId',
            parentCategoryId: 'parentCategoryId',
        });
        await createSubcategoryUseCase.execute(subcategory);
        const { description, parentCategoryId } = subcategory;
        const subcategoryCreated = await financialCategoriesRepositoryInMemory.findByDescriptionAndParentCategory(description, parentCategoryId);
        expect(subcategoryCreated).toBeDefined();
        expect(subcategoryCreated === null || subcategoryCreated === void 0 ? void 0 : subcategoryCreated.description).toEqual(subcategory.description);
        expect(subcategoryCreated === null || subcategoryCreated === void 0 ? void 0 : subcategoryCreated.parentCategoryId).toEqual(subcategory.parentCategoryId);
    });
    it('should not be able to create a new financial category with same name another', async () => {
        const subcategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Description',
            userId: 'userId',
            parentCategoryId: 'parentCategoryId',
        });
        await createSubcategoryUseCase.execute(subcategory);
        await expect(createSubcategoryUseCase.execute(subcategory)).rejects.toEqual(new AppError_1.AppError('Subategory description already exists', 400));
    });
});
//# sourceMappingURL=CreateSubcategoryUseCase.spec.js.map