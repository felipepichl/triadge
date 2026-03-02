"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinancialCategoryController = void 0;
const CreateFinancialCategoryUseCase_1 = require("@modules/financialCategory/useCases/financialCategory/createFinancialCategory/CreateFinancialCategoryUseCase");
const tsyringe_1 = require("tsyringe");
class CreateFinancialCategoryController {
    async handle(request, response) {
        const { description } = request.body;
        const { id } = request.user;
        const createFinancialCategoryUseCase = tsyringe_1.container.resolve(CreateFinancialCategoryUseCase_1.CreateFinancialCategoryUseCase);
        await createFinancialCategoryUseCase.execute({
            description,
            userId: id,
        });
        return response.status(201).send();
    }
}
exports.CreateFinancialCategoryController = CreateFinancialCategoryController;
//# sourceMappingURL=CreateFinancialCategoryController.js.map