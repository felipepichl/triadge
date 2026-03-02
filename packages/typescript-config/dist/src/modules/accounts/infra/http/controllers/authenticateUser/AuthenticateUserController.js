"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserUseCase_1 = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase");
const CookiesServices_1 = require("@shared/services/CookiesServices");
const tsyringe_1 = require("tsyringe");
class AuthenticateUserController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authenticateUserUseCase = tsyringe_1.container.resolve(AuthenticateUserUseCase_1.AuthenticateUserUseCase);
        const { user, token, refreshToken } = await authenticateUserUseCase.execute({
            email,
            password,
        });
        CookiesServices_1.CookieService.setRefreshTokenCookie(response, refreshToken);
        return response.json({
            user,
            token,
        });
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
//# sourceMappingURL=AuthenticateUserController.js.map