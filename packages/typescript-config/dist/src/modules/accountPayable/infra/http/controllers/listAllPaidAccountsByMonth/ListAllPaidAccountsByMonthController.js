"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllPaidAccountsByMonthController = void 0;
const ListAllPaidAccountsByMonthUseCase_1 = require("@modules/accountPayable/useCases/listAllPaidAccountsByMonthUseCase/ListAllPaidAccountsByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllPaidAccountsByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(ListAllPaidAccountsByMonthUseCase_1.ListAllPaidAccountsByMonthUseCase);
        const result = await useCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListAllPaidAccountsByMonthController = ListAllPaidAccountsByMonthController;
//# sourceMappingURL=ListAllPaidAccountsByMonthController.js.map