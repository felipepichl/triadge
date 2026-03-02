"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllCategoriesByUserController = void 0;
const ListAllCategoriesByUserUseCase_1 = require("@modules/financialCategory/useCases/financialCategory/listAllCategoriesByUser/ListAllCategoriesByUserUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllCategoriesByUserController {
    async handle(request, response) {
        const { id } = request.user;
        const listAllCategoriesByUserUseCase = tsyringe_1.container.resolve(ListAllCategoriesByUserUseCase_1.ListAllCategoriesByUserUseCase);
        const result = await listAllCategoriesByUserUseCase.execute({
            userId: id,
        });
        return response.status(200).json(result);
    }
}
exports.ListAllCategoriesByUserController = ListAllCategoriesByUserController;
//# sourceMappingURL=ListAllCategoriesByUserController.js.map