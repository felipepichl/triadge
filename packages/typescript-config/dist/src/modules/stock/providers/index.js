"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const BrapiB3Provider_1 = require("./B3Provider/implementations/BrapiB3Provider");
tsyringe_1.container.registerSingleton('BrapiB3Provider', BrapiB3Provider_1.BrapiB3Provider);
//# sourceMappingURL=index.js.map