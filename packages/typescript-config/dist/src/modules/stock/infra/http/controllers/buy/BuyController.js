"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyController = void 0;
const BuyUseCase_1 = require("@modules/stock/useCases/buy/BuyUseCase");
const tsyringe_1 = require("tsyringe");
class BuyController {
    async handle(request, response) {
        const { symbol, price, date, quantity, type } = request.body;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(BuyUseCase_1.BuyUseCase);
        await useCase.execute({
            symbol,
            price,
            date,
            quantity,
            type: { stockType: type },
            userId,
        });
        return response.status(201).send();
    }
}
exports.BuyController = BuyController;
//# sourceMappingURL=BuyController.js.map