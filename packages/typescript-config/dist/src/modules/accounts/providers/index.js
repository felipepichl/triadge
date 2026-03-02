"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const BCryptHashProvider_1 = require("./HashProvider/implementations/BCryptHashProvider");
const JWTTokenProvider_1 = require("./TokenProvider/implementations/JWTTokenProvider");
tsyringe_1.container.registerSingleton('HashProvider', BCryptHashProvider_1.BCryptHashProvider);
tsyringe_1.container.registerSingleton('TokenProvider', JWTTokenProvider_1.JWTTokenProvider);
//# sourceMappingURL=index.js.map