"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByDateRangeController = void 0;
const ListByDateRangeUseCase_1 = require("@modules/transactions/useCases/transaction/listByDateRange/ListByDateRangeUseCase");
const tsyringe_1 = require("tsyringe");
class ListByDateRangeController {
    async handle(request, response) {
        const { startDate, endDate } = request.query;
        const { id: userId } = request.user;
        const listByDateRangeUseCase = tsyringe_1.container.resolve(ListByDateRangeUseCase_1.ListByDateRangeUseCase);
        const result = await listByDateRangeUseCase.execute({
            userId,
            startDate: new Date(String(startDate)),
            endDate: new Date(String(endDate)),
        });
        return response.status(200).json(result);
    }
}
exports.ListByDateRangeController = ListByDateRangeController;
//# sourceMappingURL=ListByDateRangeController.js.map