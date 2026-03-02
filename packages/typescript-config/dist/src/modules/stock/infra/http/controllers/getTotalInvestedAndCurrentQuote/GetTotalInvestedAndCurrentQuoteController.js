"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTotalInvestedAndCurrentQuoteController = void 0;
const GetTotalInvestedAndCurrentQuoteUseCase_1 = require("@modules/stock/useCases/getTotalInvestedAndCurrentQuote/GetTotalInvestedAndCurrentQuoteUseCase");
const tsyringe_1 = require("tsyringe");
class GetTotalInvestedAndCurrentQuoteController {
    async handle(request, response) {
        const { type } = request.query;
        const { id: userId } = request.user;
        const useCase = tsyringe_1.container.resolve(GetTotalInvestedAndCurrentQuoteUseCase_1.GetTotalInvestedAndCurrentQuoteUseCase);
        const result = await useCase.execute({
            userId,
            type: { stockType: type },
        });
        return response.status(200).json(result);
    }
}
exports.GetTotalInvestedAndCurrentQuoteController = GetTotalInvestedAndCurrentQuoteController;
//# sourceMappingURL=GetTotalInvestedAndCurrentQuoteController.js.map