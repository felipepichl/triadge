"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const RefreshTokenUseCase_1 = require("@modules/accounts/useCases/refreshToken/RefreshTokenUseCase");
const CookiesServices_1 = require("@shared/services/CookiesServices");
const tsyringe_1 = require("tsyringe");
class RefreshTokenController {
    async handle(request, response) {
        const token = request.cookies.refreshToken;
        const refreshTokenUseCase = tsyringe_1.container.resolve(RefreshTokenUseCase_1.RefreshTokenUseCase);
        const { refreshToken } = await refreshTokenUseCase.execute(token);
        CookiesServices_1.CookieService.setRefreshTokenCookie(response, refreshToken);
        return response.status(201).send();
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=RefreshTokenController.js.map