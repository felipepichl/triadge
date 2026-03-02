"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTotalSpentToFixedAccountPayableController = void 0;
const ListTotalSpentToFixedAccountPayableUseCase_1 = require("@modules/financialCategory/useCases/financialCategory/listTotalSpentToFixedAccountPayableUseCase/ListTotalSpentToFixedAccountPayableUseCase");
const tsyringe_1 = require("tsyringe");
class ListTotalSpentToFixedAccountPayableController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listTotalSpentToFixedAccountPayableUseCase = tsyringe_1.container.resolve(ListTotalSpentToFixedAccountPayableUseCase_1.ListTotalSpentToFixedAccountPayableUseCase);
        const result = await listTotalSpentToFixedAccountPayableUseCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListTotalSpentToFixedAccountPayableController = ListTotalSpentToFixedAccountPayableController;
//# sourceMappingURL=ListTotalSpentToFixedAccountPayableController.js.map