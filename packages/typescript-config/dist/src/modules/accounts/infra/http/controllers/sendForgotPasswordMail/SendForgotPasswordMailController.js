"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordMailController = void 0;
const SendForgotPassordMailUseCase_1 = require("@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassordMailUseCase");
const tsyringe_1 = require("tsyringe");
class SendForgotPasswordMailController {
    async handle(request, response) {
        const { email } = request.body;
        const sendForgotPasswordMailUseCase = tsyringe_1.container.resolve(SendForgotPassordMailUseCase_1.SendForgotPassordMailUseCase);
        await sendForgotPasswordMailUseCase.execute(email);
        return response.status(204).json();
    }
}
exports.SendForgotPasswordMailController = SendForgotPasswordMailController;
//# sourceMappingURL=SendForgotPasswordMailController.js.map