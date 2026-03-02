import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory'
import { DateProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/DateProviderInMemory'
import { MalProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MalProviderInMemory'

import { SendForgotPassordMailUseCase } from './SendForgotPassordMailUseCase'

let sendForgotPassordMailUseCase: SendForgotPassordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokenRepositoryInMemory
let dateProviderInMemory: DateProviderInMemory
let mailProviderInMemory: MalProviderInMemory

describe('[Account] - Send Forgot Password Mail Use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory()
    dateProviderInMemory = new DateProviderInMemory()
    mailProviderInMemory = new MalProviderInMemory()

    sendForgotPassordMailUseCase = new SendForgotPassordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProviderInMemory,
      mailProviderInMemory,
    )
  })

  it('should be able to send a forgot password email', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail')

    const user = User.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phoneNumber: '',
    })

    await usersRepositoryInMemory.create(user)

    await sendForgotPassordMailUseCase.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exist', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail')

    const recoveryEmail = 'nonexistentuser@example.com'

    const result = await sendForgotPassordMailUseCase.execute({
      email: recoveryEmail,
    })

    expect(result).toEqual({
      message: `If the provided ${recoveryEmail} is associated with an account, a recovery email will be sent.`,
    })

    expect(sendMail).not.toHaveBeenCalled()
  })
})
