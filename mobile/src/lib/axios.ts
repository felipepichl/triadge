import axios from 'axios'

import { APIInstanceProps } from './@types/api-types'

// TODO: Configurar URL da API através de variáveis de ambiente
const API_URL = 'http://localhost:3331'

const api = axios.create({
  baseURL: API_URL,
}) as APIInstanceProps

// Implementa o método registerInterceptTokenManager na instância do axios
api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        signOut()
      }
      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
