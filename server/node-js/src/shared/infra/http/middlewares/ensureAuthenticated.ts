import { authConfig } from '@config/auth'
// import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/error/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { secretToken } = authConfig

  try {
    const decoded = verify(token, secretToken)

    const { sub: userId } = decoded as ITokenPayload

    // const usersRepository = new UsersRepository();
    // const user = await usersRepository.findById(user_id);

    // if (!user) {
    //   throw new AppError('User does not exists', 401);
    // }

    request.user = {
      id: userId,
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}

export { ensureAuthenticated }
