"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AggregateRoot_1 = require("@shared/core/domain/AggregateRoot");
class User extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get avatar() {
        return this.props.avatar;
    }
    get phoneNumber() {
        return this.props.phoneNumber;
    }
    static createUser({ id, name, email, password, phoneNumber, avatar, }) {
        const userProps = {
            name,
            email,
            password,
            phoneNumber,
            avatar,
        };
        return AggregateRoot_1.AggregateRoot.create({ props: userProps, id }, User);
    }
    updateAvatar(avatar) {
        this.props.avatar = avatar;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map