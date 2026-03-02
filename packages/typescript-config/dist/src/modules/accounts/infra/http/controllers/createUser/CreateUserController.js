"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const tsyringe_1 = require("tsyringe");
class CreateUserController {
    async handle(request, response) {
        const { name, email, password, phoneNumber } = request.body;
        const createUserUseCase = tsyringe_1.container.resolve(CreateUserUseCase_1.CreateUserUseCase);
        await createUserUseCase.execute({
            name,
            email,
            password,
            phoneNumber,
        });
        return response.status(201).send();
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUserController.js.map