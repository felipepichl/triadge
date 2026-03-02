"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokens = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class UserTokens extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get userId() {
        return this.props.userId;
    }
    get expiresDate() {
        return this.props.expiresDate;
    }
    get refreshToken() {
        return this.props.refreshToken;
    }
    static createUserTokens({ id, userId, expiresDate, refreshToken, }) {
        const userTokensProps = {
            userId,
            expiresDate,
            refreshToken,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: userTokensProps, id }, UserTokens);
    }
}
exports.UserTokens = UserTokens;
//# sourceMappingURL=UserTokens.js.map