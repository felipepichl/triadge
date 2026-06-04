import { AppError } from '@shared/error/AppError'
import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodSchema } from 'zod'

interface ValidationSchemas {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
}

function validateRequest(schemas: ValidationSchemas) {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        request.body = schemas.body.parse(request.body)
      }

      if (schemas.query) {
        request.query = schemas.query.parse(request.query)
      }

      if (schemas.params) {
        request.params = schemas.params.parse(request.params)
      }

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ')

        throw new AppError(message, 400)
      }

      throw error
    }
  }
}

export { validateRequest }
