import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { CreateUserController } from '../controllers/createUser/CreateUserController'
import { CreateUserPartialController } from '../controllers/createUserPartial/CreateUserPartialController'
import { UploadUserAvatarController } from '../controllers/updateUserAvatar/UploadUserAvatarController'
import { ListAllController } from '../controllers/listAll/ListAllController'

const usersRouter = Router()

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const createUserPartialController = new CreateUserPartialController()
const uploadUserAvatarController = new UploadUserAvatarController()
const listAllController = new ListAllController()

usersRouter.post('', createUserController.handle)

usersRouter.use(ensureAuthenticated)

usersRouter.post('/partial', createUserPartialController.handle)
usersRouter.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  uploadUserAvatarController.handle,
)
usersRouter.get('', listAllController.handle)

export { usersRouter }
