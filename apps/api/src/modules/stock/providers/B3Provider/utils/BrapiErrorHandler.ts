import { AppError } from '@shared/error/AppError'

interface BrapiErrorHandlerProps {
  response?: {
    status: number
  }
}

class BrapiErrorHandler {
  static handle(error: BrapiErrorHandlerProps): null | never {
    if (error.response) {
      const { status } = error.response

      if (status === 400) {
        throw new AppError('Invalid request to the BrAPI', 400)
      }
      if (status === 401) {
        throw new AppError('Invalid or unauthorized token', 401)
      }
      if (status === 402) {
        throw new AppError('Request limit reached for the BrAPI', 402)
      }
      if (status === 404) {
        throw new AppError('Stock not found for the BrAPI', 404)
      }
    }

    throw new AppError('Unknown error while accessing the BrAPI', 500)
  }
}

export { BrapiErrorHandler }
