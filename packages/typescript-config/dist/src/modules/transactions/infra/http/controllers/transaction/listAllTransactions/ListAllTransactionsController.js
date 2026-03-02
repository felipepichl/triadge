"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllTransactionsController = void 0;
const ListAllTransactionUseCase_1 = require("@modules/transactions/useCases/transaction/listAllTransactions/ListAllTransactionUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllTransactionsController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const listAllTransactionsUseCase = tsyringe_1.container.resolve(ListAllTransactionUseCase_1.ListAllTransactionUseCase);
        const result = await listAllTransactionsUseCase.execute({
            userId,
        });
        return response.status(200).json(result);
    }
}
exports.ListAllTransactionsController = ListAllTransactionsController;
//# sourceMappingURL=ListAllTransactionsController.js.map