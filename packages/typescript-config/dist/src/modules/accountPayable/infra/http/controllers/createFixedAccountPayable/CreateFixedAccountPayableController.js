"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFixedAccountPayableController = void 0;
const CreateFixedAccounsPayableUseCase_1 = require("@modules/accountPayable/useCases/createFixedAccountsPayable/CreateFixedAccounsPayableUseCase");
const tsyringe_1 = require("tsyringe");
class CreateFixedAccountPayableController {
    async handle(request, response) {
        const { description, amount, dueDate, financialCategoryId, subcategoryId } = request.body;
        const { id: userId } = request.user;
        const createFixedAccountPayableUseCase = tsyringe_1.container.resolve(CreateFixedAccounsPayableUseCase_1.CreateFixedAccountsPayableUseCase);
        await createFixedAccountPayableUseCase.execute({
            description,
            amount,
            dueDate,
            userId,
            financialCategoryId,
            subcategoryId,
        });
        return response.status(201).send();
    }
}
exports.CreateFixedAccountPayableController = CreateFixedAccountPayableController;
//# sourceMappingURL=CreateFixedAccountPayableController.js.map