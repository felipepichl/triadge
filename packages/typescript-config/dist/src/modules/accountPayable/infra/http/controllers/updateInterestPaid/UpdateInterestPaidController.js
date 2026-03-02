"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInterestPaidController = void 0;
const UpdateInterestPaidUseCase_1 = require("@modules/accountPayable/useCases/updateInterestPaid/UpdateInterestPaidUseCase");
const tsyringe_1 = require("tsyringe");
class UpdateInterestPaidController {
    async hanlde(request, response) {
        const { amount } = request.body;
        const { id: accountPayableId } = request.params;
        const useCase = tsyringe_1.container.resolve(UpdateInterestPaidUseCase_1.UpdateInterestPaidUseCase);
        await useCase.execute({
            amount,
            accountPayableId,
        });
        return response.status(201).send();
    }
}
exports.UpdateInterestPaidController = UpdateInterestPaidController;
//# sourceMappingURL=UpdateInterestPaidController.js.map