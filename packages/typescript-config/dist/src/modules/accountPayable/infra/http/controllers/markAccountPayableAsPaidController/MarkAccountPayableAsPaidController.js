"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAccountPayableAsPaidController = void 0;
const MarkAccountPayableAsPaidUseCase_1 = require("@modules/accountPayable/useCases/markAccountPayableAsPaidUseCase/MarkAccountPayableAsPaidUseCase");
const tsyringe_1 = require("tsyringe");
class MarkAccountPayableAsPaidController {
    async handle(request, response) {
        const { id: accountPayableId } = request.params;
        const markAccountPayableAsPaidUseCase = tsyringe_1.container.resolve(MarkAccountPayableAsPaidUseCase_1.MarkAccountPayableAsPaidUseCase);
        await markAccountPayableAsPaidUseCase.execute({ accountPayableId });
        return response.status(201).send();
    }
}
exports.MarkAccountPayableAsPaidController = MarkAccountPayableAsPaidController;
//# sourceMappingURL=MarkAccountPayableAsPaidController.js.map