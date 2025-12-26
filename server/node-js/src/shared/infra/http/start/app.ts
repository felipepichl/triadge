import 'express-async-errors'

import { AppError } from '@shared/error/AppError'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import sweggerUi from 'swagger-ui-express'

import sweggerFile from '../../../../../swegger.json'
import { routes } from '../routes'

// Load environment variables early in the process
dotenv.config({ path: '.env' })

const app = express()

// Health check route - before any middleware
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

try {
  // Load container after basic setup
  import('@shared/container')
} catch (error) {
  console.error('❌ Failed to load container:', error)
  process.exit(1)
}

// Dynamic CORS configuration for development
const allowedOrigins = [
  'http://localhost:3577', // Web app
  'http://localhost:8081', // Expo mobile (common port)
  'http://localhost:3000', // Alternative web port
  'http://192.168.1.1:8081', // Common local network IP + Expo port
  'http://10.0.2.2:8081', // Android emulator to host
  'exp://192.168.1.1:8081', // Expo development on local network
  'exp://10.0.2.2:8081', // Expo on Android emulator
]

// For development, allow all localhost origins and common mobile development origins
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)

    // Allow localhost origins for development
    if (
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin.startsWith('exp://')
    ) {
      return callback(null, true)
    }

    // Allow Expo tunnel domains (--tunnel flag)
    if (
      origin.includes('.exp.direct') ||
      origin.includes('.expo.dev') ||
      origin.includes('.expo.io') ||
      origin.includes('expo-development.app') ||
      origin.match(/^https:\/\/[a-z0-9-]+\.exp\.direct/) ||
      origin.match(/^https:\/\/[a-z0-9-]+\.expo\.dev/) ||
      origin.match(/^https:\/\/[a-z0-9-]+\.expo\.io/)
    ) {
      return callback(null, true)
    }

    // Allow common development IPs
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // In production, you might want to restrict this
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}

app.use(cors(corsOptions))

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
