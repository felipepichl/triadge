import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { AppError } from '@shared/error/AppError'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

async function ensureRefreshToken(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const refreshToken = request.cookies.refreshToken

  if (!refreshToken) {
    throw new AppError('RefreshToken missing', 401)
  }

  const { id: userId } = request.user

  const userTokensRepository = container.resolve<IUsersTokensRepository>(
    'UsersTokensRepository',
  )
  const userToken = await userTokensRepository.findByUserIdAndRefreshToken(
    userId,
    refreshToken,
  )

  if (!userToken) {
    throw new AppError('RefreshToken does not exists', 401)
  }

  next()
}

export { ensureRefreshToken }
