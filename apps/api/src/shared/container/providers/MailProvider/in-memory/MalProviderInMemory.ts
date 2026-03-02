import { IMalProvider } from '../models/IMalProvider'

class MalProviderInMemory implements IMalProvider {
  private messages: string[] = []

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    this.messages.push(`${to}-${subject}-${body}`)
  }
}

export { MalProviderInMemory }
