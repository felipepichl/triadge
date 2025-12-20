import 'express-async-errors'
import { AppError } from '@shared/error/AppError'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import sweggerUi from 'swagger-ui-express'

import sweggerFile from '../../../../../swegger.json'
import { routes } from '../routes'

console.log('🚀 Initializing Express app...')

const app = express()

// Health check route - before any middleware
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

try {
  // Load container after basic setup
  import('@shared/container')
  console.log('✅ Container loaded successfully')
} catch (error) {
  console.error('❌ Failed to load container:', error)
  process.exit(1)
}

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
