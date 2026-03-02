"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListSubcategoryByCategoryIdController = void 0;
const ListSubcategoriesByCategoryIdUseCase_1 = require("@modules/financialCategory/useCases/subcategory/listSubcategoriesByCategoryId/ListSubcategoriesByCategoryIdUseCase");
const tsyringe_1 = require("tsyringe");
class ListSubcategoryByCategoryIdController {
    async handle(request, response) {
        const { parentCategoryId } = request.params;
        const { id } = request.user;
        const listSubcategoriesByCategoryIdUseCase = tsyringe_1.container.resolve(ListSubcategoriesByCategoryIdUseCase_1.ListSubcategoriesByCategoryIdUseCase);
        const result = await listSubcategoriesByCategoryIdUseCase.execute({
            userId: id,
            parentCategoryId,
        });
        return response.status(200).json(result);
    }
}
exports.ListSubcategoryByCategoryIdController = ListSubcategoryByCategoryIdController;
//# sourceMappingURL=ListSubcategoryByCategoryIdController.js.map