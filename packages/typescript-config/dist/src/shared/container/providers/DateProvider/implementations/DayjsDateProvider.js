"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class DayjsDateProvider {
    addDays(days) {
        return (0, dayjs_1.default)().add(days, 'days').toDate();
    }
    addHours(hours) {
        return (0, dayjs_1.default)().add(hours, 'hours').toDate();
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
//# sourceMappingURL=DayjsDateProvider.js.map