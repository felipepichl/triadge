"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRoutes = void 0;
const express_1 = require("express");
const SendForgotPasswordMailController_1 = require("../controllers/sendForgotPasswordMail/SendForgotPasswordMailController");
const passwordRoutes = (0, express_1.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMail = new SendForgotPasswordMailController_1.SendForgotPasswordMailController();
passwordRoutes.post('/forgot', sendForgotPasswordMail.handle);
//# sourceMappingURL=passoword.routes.js.map