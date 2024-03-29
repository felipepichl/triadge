import express, { Request, Response, NextFunction } from 'express'
import sweggerUi from 'swagger-ui-express'

import { AppError } from '@shared/error/AppError'

import 'express-async-errors'
import cors from 'cors'
import '@shared/container'

import sweggerFile from '../../../../../swegger.json'
import { routes } from '../routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', sweggerUi.serve, sweggerUi.setup(sweggerFile))
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message })
    }

    console.log('AppError => ', err.message)
    return response.status(500).json({
      message: `Internal server error ${err.message}`,
    })
  },
)

export { app }
