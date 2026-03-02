"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllFixedAccountsByMonthController = void 0;
const ListAllFixedAccountsByMonthUseCase_1 = require("@modules/accountPayable/useCases/listAllFixedAccountsByMonth/ListAllFixedAccountsByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllFixedAccountsByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listAllFixedAccountsByMonthUseCase = tsyringe_1.container.resolve(ListAllFixedAccountsByMonthUseCase_1.ListAllFixedAccountsByMonthUseCase);
        const result = await listAllFixedAccountsByMonthUseCase.execute({
            month: Number(month),
            userId,
        });
        return response.status(200).json(result);
    }
}
exports.ListAllFixedAccountsByMonthController = ListAllFixedAccountsByMonthController;
//# sourceMappingURL=ListAllFixedAccountsByMonthController.js.map