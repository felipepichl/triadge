import 'express-async-errors'
import '@shared/container'

import { AppError } from '@shared/error/AppError'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import sweggerUi from 'swagger-ui-express'

import sweggerFile from '../../../../../swegger.json'
import { routes } from '../routes'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3333', process.env.ORIGIN],
  }),
)
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
