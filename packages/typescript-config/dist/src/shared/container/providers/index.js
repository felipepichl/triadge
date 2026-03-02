"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
const DiskStorageProvider_1 = require("./StorageProvider/implementations/DiskStorageProvider");
tsyringe_1.container.registerSingleton('StorageProvider', DiskStorageProvider_1.DiskStorageProvider);
tsyringe_1.container.registerSingleton('DateProvider', DayjsDateProvider_1.DayjsDateProvider);
//# sourceMappingURL=index.js.map