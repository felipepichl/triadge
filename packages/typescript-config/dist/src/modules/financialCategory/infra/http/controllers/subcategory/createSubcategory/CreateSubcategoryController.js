"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubcategoryController = void 0;
const CreateSubcategoryUseCase_1 = require("@modules/financialCategory/useCases/subcategory/createSubcategory/CreateSubcategoryUseCase");
const tsyringe_1 = require("tsyringe");
class CreateSubcategoryController {
    async handle(request, response) {
        const { description, parentCategoryId } = request.body;
        const { id } = request.user;
        const createSubcategoryUseCase = tsyringe_1.container.resolve(CreateSubcategoryUseCase_1.CreateSubcategoryUseCase);
        await createSubcategoryUseCase.execute({
            description,
            userId: id,
            parentCategoryId,
        });
        return response.status(201).send();
    }
}
exports.CreateSubcategoryController = CreateSubcategoryController;
//# sourceMappingURL=CreateSubcategoryController.js.map