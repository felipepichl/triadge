import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

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

  async sendMail(to: string, subject: string, variables: any, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'Triadge <noreplay@triadge,io>',
      subject,
      html: templateHTML,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', message.getTestMessager(message))
  }
}

export { EtherealMailProvider }
