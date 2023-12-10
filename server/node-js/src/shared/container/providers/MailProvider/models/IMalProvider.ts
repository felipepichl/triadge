interface IMalProvider {
  sendMail(to: string, subject: string, body: string): Promise<void>
}

export { IMalProvider }
