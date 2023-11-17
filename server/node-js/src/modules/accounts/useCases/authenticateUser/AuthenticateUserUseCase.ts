import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IHashProvider } from '@modules/accounts/providers/HashProvider/models/IHashProvider'
import { IDateProvider } from '@shared/container/providers/DateProvider/models/IDateProvider'
import { ITokenProvider } from '@modules/accounts/providers/TokenProvider/models/ITokenProvider'

// import { UserTokens } from '@modules/accounts/domain/UserTokens'

import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorret email/password combination')
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new AppError('Incorret email/password combination')
    }

    const token = this.tokenProvider.encodeToken({
      sub: user.id.toString(),
      email,
    })

    // const token = sign({ email: user.email }, secretToken, {
    //   subject: user.id.toString(),
    //   expiresIn: expiresInToken,
    // })

    // console.log(token)

    // const refreshToken = sign({ email }, secretRefreshToken, {
    //   subject: user.id.toString(),
    //   expiresIn: expiresInRefreshToken,
    // })

    // const refreshTokenExpiresDate = this.dateProvider.addDays(
    //   expiresRefreshTokenDays,
    // )

    // const userTokens = UserTokens.createUserTokens({
    //   userId: user.id.toString(),
    //   expiresDate: refreshTokenExpiresDate,
    //   refreshToken,
    // })

    // await this.usersTokensRepository.create(userTokens)

    const { name } = user

    const returnResponse: IResponse = {
      user: {
        name,
        email,
      },
      token,
    }

    return returnResponse
  }
}

export { AuthenticateUserUseCase }
