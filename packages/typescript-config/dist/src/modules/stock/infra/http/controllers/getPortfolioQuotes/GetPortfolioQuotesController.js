"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPortfolioQuotesController = void 0;
const GetPortfolioQuotesUseCase_1 = require("@modules/stock/useCases/getPortfolioQuotes/GetPortfolioQuotesUseCase");
const tsyringe_1 = require("tsyringe");
class GetPortfolioQuotesController {
    async handle(request, response) {
        const { type } = request.query;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(GetPortfolioQuotesUseCase_1.GetPortfolioQuotesUseCase);
        const result = await useCase.execute({
            userId,
            type: { stockType: type },
        });
        return response.status(200).json(result);
    }
}
exports.GetPortfolioQuotesController = GetPortfolioQuotesController;
//# sourceMappingURL=GetPortfolioQuotesController.js.map