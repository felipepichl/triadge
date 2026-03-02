"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrapiErrorHandler = void 0;
const AppError_1 = require("@shared/error/AppError");
class BrapiErrorHandler {
    static handle(error) {
        if (error.response) {
            const { status } = error.response;
            if (status === 400) {
                throw new AppError_1.AppError('Invalid request to the BrAPI', 400);
            }
            if (status === 401) {
                throw new AppError_1.AppError('Invalid or unauthorized token', 401);
            }
            if (status === 402) {
                throw new AppError_1.AppError('Request limit reached for the BrAPI', 402);
            }
            if (status === 404) {
                throw new AppError_1.AppError('Stock not found for the BrAPI', 404);
            }
        }
        throw new AppError_1.AppError('Unknown error while accessing the BrAPI', 500);
    }
}
exports.BrapiErrorHandler = BrapiErrorHandler;
//# sourceMappingURL=BrapiErrorHandler.js.map