"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTotalSpentToUnfixedAccountsPayableController = void 0;
const ListTotalSpentToUnfixedAccountPayableUseCase_1 = require("@modules/financialCategory/useCases/financialCategory/listTotalSpentToUnfixedAccountPayableUseCase/ListTotalSpentToUnfixedAccountPayableUseCase");
const tsyringe_1 = require("tsyringe");
class ListTotalSpentToUnfixedAccountsPayableController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listTotalSpentToUnfixedAccountPayableUseCase = tsyringe_1.container.resolve(ListTotalSpentToUnfixedAccountPayableUseCase_1.ListTotalSpentToUnfixedAccountPayableUseCase);
        const result = await listTotalSpentToUnfixedAccountPayableUseCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListTotalSpentToUnfixedAccountsPayableController = ListTotalSpentToUnfixedAccountsPayableController;
//# sourceMappingURL=ListTotalSpentToUnfixedAccountsPayableController.js.map