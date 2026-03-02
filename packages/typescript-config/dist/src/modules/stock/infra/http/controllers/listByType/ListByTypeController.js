"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByTypeController = void 0;
const ListByTypeUseCase_1 = require("@modules/stock/useCases/listByType/ListByTypeUseCase");
const tsyringe_1 = require("tsyringe");
class ListByTypeController {
    async handle(request, response) {
        const { type } = request.query;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(ListByTypeUseCase_1.ListByTypeUseCase);
        const result = await useCase.execute({
            userId,
            type: { stockType: type },
        });
        return response.status(200).json(result);
    }
}
exports.ListByTypeController = ListByTypeController;
//# sourceMappingURL=ListByTypeController.js.map