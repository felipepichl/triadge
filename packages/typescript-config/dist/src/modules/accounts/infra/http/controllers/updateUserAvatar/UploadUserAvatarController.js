"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadUserAvatarController = void 0;
const UploadUserAvatarUseCase_1 = require("@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarUseCase");
const tsyringe_1 = require("tsyringe");
class UploadUserAvatarController {
    async handle(request, response) {
        const { filename: avatarFile } = request.file;
        const { id: userId } = request.user;
        const uploadUserAvatarUseCase = tsyringe_1.container.resolve(UploadUserAvatarUseCase_1.UploadUserAvatarUseCase);
        await uploadUserAvatarUseCase.execute({
            avatarFile,
            userId,
        });
        return response.status(204).send();
    }
}
exports.UploadUserAvatarController = UploadUserAvatarController;
//# sourceMappingURL=UploadUserAvatarController.js.map