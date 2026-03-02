"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellController = void 0;
const SellStocksUseCase_1 = require("@modules/stock/useCases/sellStocks/SellStocksUseCase");
const tsyringe_1 = require("tsyringe");
class SellController {
    async handle(request, response) {
        const { symbol, price, date, quantity } = request.body;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(SellStocksUseCase_1.SellStocksUseCase);
        await useCase.execute({
            symbol,
            price,
            date,
            quantity,
            userId,
        });
        return response.status(201).send();
    }
}
exports.SellController = SellController;
//# sourceMappingURL=SellController.js.map