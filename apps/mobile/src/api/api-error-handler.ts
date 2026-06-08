import { AxiosError } from 'axios'

import { ApiError } from './api-error'

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.'

    if (status === 400) {
      errorMessage = 'Dados inválidos. Verifique os campos e tente novamente.'
    } else if (status === 401) {
      errorMessage = 'Você não está autorizado. Faça login novamente.'
    } else if (status === 404) {
      errorMessage = 'Recurso não encontrado.'
    } else if (status === 500) {
      errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.'
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'Falha na conexão com o servidor. Verifique sua internet.'
    }

    return new ApiError(errorMessage, status)
  }

  return new ApiError('Erro desconhecido. Tente novamente mais tarde.')
}
