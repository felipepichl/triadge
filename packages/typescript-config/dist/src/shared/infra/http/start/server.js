"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const server = app_1.app.listen(3331, () => {
    console.log('Server running in port 3331');
});
server.on('error', (error) => {
    console.error('Server failed to start:', error.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map