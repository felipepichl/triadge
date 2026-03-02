"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAmountVariableController = void 0;
const UpdateAmountVariableUseCase_1 = require("@modules/accountPayable/useCases/updateAmountVariableUseCase/UpdateAmountVariableUseCase");
const tsyringe_1 = require("tsyringe");
class UpdateAmountVariableController {
    async handle(request, response) {
        const { amount } = request.body;
        const { id: accountPayableId } = request.params;
        const useCase = tsyringe_1.container.resolve(UpdateAmountVariableUseCase_1.UpdateAmountVariableUseCase);
        await useCase.execute({
            amount,
            accountPayableId,
        });
        return response.status(201).send();
    }
}
exports.UpdateAmountVariableController = UpdateAmountVariableController;
//# sourceMappingURL=UpdateAmountVariableController.js.map