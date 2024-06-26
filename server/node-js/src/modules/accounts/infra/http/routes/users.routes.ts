import { uploadConfig } from '@config/upload'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '../controllers/createUser/CreateUserController'
import { ListAllController } from '../controllers/listAll/ListAllController'
import { UploadUserAvatarController } from '../controllers/updateUserAvatar/UploadUserAvatarController'

const usersRouter = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const uploadUserAvatarController = new UploadUserAvatarController()
const listAllController = new ListAllController()

usersRouter.post('', createUserController.handle)

usersRouter.use(ensureAuthenticated)
usersRouter.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handle,
)
usersRouter.get('', listAllController.handle)

export { usersRouter }
