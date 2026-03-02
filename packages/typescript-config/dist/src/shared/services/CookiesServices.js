"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieService = void 0;
class CookieService {
    static setRefreshTokenCookie(response, refreshToken) {
        const cookieOptions = {
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true,
        };
        response.cookie('refreshToken', refreshToken, cookieOptions);
    }
}
exports.CookieService = CookieService;
//# sourceMappingURL=CookiesServices.js.map