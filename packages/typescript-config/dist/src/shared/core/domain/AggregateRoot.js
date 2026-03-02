"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const Entity_1 = require("./Entity");
class AggregateRoot extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(params, Clazz) {
        var _a, _b;
        const { props, id } = params;
        const updatedProps = Object.assign(Object.assign({}, props), { created_at: (_a = props.created_at) !== null && _a !== void 0 ? _a : new Date(), updated_at: (_b = props.updated_at) !== null && _b !== void 0 ? _b : new Date() });
        const uniqueId = id;
        const instance = new Clazz(updatedProps, uniqueId);
        return instance;
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=AggregateRoot.js.map