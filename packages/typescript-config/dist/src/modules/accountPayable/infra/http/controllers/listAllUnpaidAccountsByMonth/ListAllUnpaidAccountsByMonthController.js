"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUnpaidAccountsByMonthController = void 0;
const ListAllUnpaidAccountsByMonthUseCase_1 = require("@modules/accountPayable/useCases/listAllUnpaidAccountsByMonth/ListAllUnpaidAccountsByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllUnpaidAccountsByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listAllUnpaidAccountsByMonthUseCase = tsyringe_1.container.resolve(ListAllUnpaidAccountsByMonthUseCase_1.ListAllUnpaidAccountsByMonthUseCase);
        const result = await listAllUnpaidAccountsByMonthUseCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListAllUnpaidAccountsByMonthController = ListAllUnpaidAccountsByMonthController;
//# sourceMappingURL=ListAllUnpaidAccountsByMonthController.js.map