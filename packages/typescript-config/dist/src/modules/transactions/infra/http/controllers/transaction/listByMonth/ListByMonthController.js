"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByMonthController = void 0;
const ListByMonthUseCase_1 = require("@modules/transactions/useCases/transaction/listByMonth/ListByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listByMonthUseCase = tsyringe_1.container.resolve(ListByMonthUseCase_1.ListByMonthUseCase);
        const result = await listByMonthUseCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListByMonthController = ListByMonthController;
//# sourceMappingURL=ListByMonthController.js.map