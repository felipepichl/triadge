"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionController = void 0;
const CreateTransactionUseCase_1 = require("@modules/transactions/useCases/transaction/createTransactions/CreateTransactionUseCase");
const tsyringe_1 = require("tsyringe");
class CreateTransactionController {
    async handle(request, response) {
        const { description, detail, type, date, amount, financialCategoryId, subcategoryId, } = request.body;
        const { id: userId } = request.user;
        const createTransactionUseCase = tsyringe_1.container.resolve(CreateTransactionUseCase_1.CreateTransactionUseCase);
        await createTransactionUseCase.execute({
            description,
            detail,
            type,
            date,
            amount,
            userId,
            financialCategoryId,
            subcategoryId,
        });
        return response.status(201).send();
    }
}
exports.CreateTransactionController = CreateTransactionController;
//# sourceMappingURL=CreateTransactionController.js.map