"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountsPayableController = void 0;
const CreateAccountPayableUseCase_1 = require("@modules/accountPayable/useCases/createAccountPayableUseCase/CreateAccountPayableUseCase");
const tsyringe_1 = require("tsyringe");
class CreateAccountsPayableController {
    async handle(request, response) {
        const { description, amount, dueDate, financialCategoryId, subcategoryId, installments, } = request.body;
        const { id: userId } = request.user;
        const createAccountPayableUseCase = tsyringe_1.container.resolve(CreateAccountPayableUseCase_1.CreateAccountPayableUseCase);
        await createAccountPayableUseCase.execute({
            description,
            amount,
            dueDate,
            userId,
            financialCategoryId,
            subcategoryId,
            installments,
        });
        return response.status(201).send();
    }
}
exports.CreateAccountsPayableController = CreateAccountsPayableController;
//# sourceMappingURL=CreateAccountsPayableController.js.map