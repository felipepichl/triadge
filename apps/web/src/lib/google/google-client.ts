import { gapi } from 'gapi-script'

export const initializeGoogleClient = async ({
  apiKey,
  clientId,
  scopes,
}: {
  apiKey: string
  clientId: string
  scopes: string[]
}) => {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey,
          clientId,
          scope: scopes.join(' '),
        })
        .then(() => {
          resolve()
        })
        .catch((error) => {
          console.error('Erro ao inicializar o Google API client:', error)
          reject(error)
        })
    })
  })
}
