import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadUserAvatarUseCase } from '@modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarUseCase'

class UploadUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename: avatarFile } = request.file
    const { id: userId } = request.user

    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase)

    await uploadUserAvatarUseCase.execute({
      avatarFile,
      userId,
    })

    return response.status(204).send()
  }
}

export { UploadUserAvatarController }
