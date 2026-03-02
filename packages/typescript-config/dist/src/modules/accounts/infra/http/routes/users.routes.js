"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const upload_1 = require("@config/upload");
const ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("../controllers/createUser/CreateUserController");
const ListAllController_1 = require("../controllers/listAll/ListAllController");
const UploadUserAvatarController_1 = require("../controllers/updateUserAvatar/UploadUserAvatarController");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
const uploadAvatar = (0, multer_1.default)(upload_1.uploadConfig);
const createUserController = new CreateUserController_1.CreateUserController();
const uploadUserAvatarController = new UploadUserAvatarController_1.UploadUserAvatarController();
const listAllController = new ListAllController_1.ListAllController();
usersRouter.post('', createUserController.handle);
usersRouter.use(ensureAuthenticated_1.ensureAuthenticated);
usersRouter.patch('/avatar', uploadAvatar.single('avatar'), uploadUserAvatarController.handle);
usersRouter.get('', listAllController.handle);
//# sourceMappingURL=users.routes.js.map