"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFIIPurchasesByMonthController = void 0;
const ListFIIPurchasesByMonthUseCase_1 = require("@modules/stock/useCases/listFIIPurchasesByMonth/ListFIIPurchasesByMonthUseCase");
const tsyringe_1 = require("tsyringe");
class ListFIIPurchasesByMonthController {
    async handle(request, response) {
        const { month } = request.query;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(ListFIIPurchasesByMonthUseCase_1.ListFIIPurchasesByMonthUseCase);
        const result = await useCase.execute({
            userId,
            month: Number(month),
        });
        return response.status(200).json(result);
    }
}
exports.ListFIIPurchasesByMonthController = ListFIIPurchasesByMonthController;
//# sourceMappingURL=ListFIIPurchasesByMonthController.js.map