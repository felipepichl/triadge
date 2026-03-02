"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTotalSpentByFinancialCategoryController = void 0;
const ListTotalSpentByFinancialCategoryUseCase_1 = require("@modules/financialCategory/useCases/financialCategory/listTotalSpentByFinancialCategoryUseCase/ListTotalSpentByFinancialCategoryUseCase");
const tsyringe_1 = require("tsyringe");
class ListTotalSpentByFinancialCategoryController {
    async handle(request, response) {
        const { type, month } = request.query;
        const { id } = request.user;
        const listTotalSpentByFinancialCategoryUseCase = tsyringe_1.container.resolve(ListTotalSpentByFinancialCategoryUseCase_1.ListTotalSpentByFinancialCategoryUseCase);
        const result = await listTotalSpentByFinancialCategoryUseCase.execute({
            userId: id,
            type: { type },
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListTotalSpentByFinancialCategoryController = ListTotalSpentByFinancialCategoryController;
//# sourceMappingURL=ListTotalSpentByFinancialCategoryController.js.map