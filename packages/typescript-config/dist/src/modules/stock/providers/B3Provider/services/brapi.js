"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.brapi = void 0;
const axios_1 = __importDefault(require("axios"));
const brapi = axios_1.default.create({
    baseURL: 'https://brapi.dev/api',
});
exports.brapi = brapi;
//# sourceMappingURL=brapi.js.map