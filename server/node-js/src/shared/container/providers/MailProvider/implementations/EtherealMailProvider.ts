import { injectable } from 'tsyringe'

import nodemailer, { Transporter } from 'nodemailer'

import { IMalProvider } from '../models/IMalProvider'

@injectable()
class EtherealMailProvider implements IMalProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((err) => console.error(err))
  }

  async sendMail(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to,
      from: 'Triadge <noreplay@triadge,io>',
      subject,
      text: body,
      html: body,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', message.getTestMessager(message))
  }
}

export { EtherealMailProvider }
