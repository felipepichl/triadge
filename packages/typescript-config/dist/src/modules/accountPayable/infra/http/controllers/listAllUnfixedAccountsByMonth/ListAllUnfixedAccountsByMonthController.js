"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUnfixedAccountsByMonthController = void 0;
const ListAllUnfixedAccountsByMonthUseCase_1 = require("@modules/accountPayable/useCases/listAllUnfixedAcountsByMonthUseCase/ListAllUnfixedAccountsByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllUnfixedAccountsByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const listAllUnfixedAccountsByMonthUseCase = tsyringe_1.container.resolve(ListAllUnfixedAccountsByMonthUseCase_1.ListAllUnfixedAccountsByMonthUseCase);
        const result = await listAllUnfixedAccountsByMonthUseCase.execute({
            month: Number(month),
            userId,
        });
        return response.status(200).json(result);
    }
}
exports.ListAllUnfixedAccountsByMonthController = ListAllUnfixedAccountsByMonthController;
//# sourceMappingURL=ListAllUnfixedAccountsByMonthController.js.map