"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllController = void 0;
const ListAllUseCase_1 = require("@modules/accounts/useCases/listAll/ListAllUseCase");
const tsyringe_1 = require("tsyringe");
class ListAllController {
    async handle(request, response) {
        const listAllUseCase = tsyringe_1.container.resolve(ListAllUseCase_1.ListAllUseCase);
        const result = await listAllUseCase.execute();
        return response.status(200).json(result);
    }
}
exports.ListAllController = ListAllController;
//# sourceMappingURL=ListAllController.js.map