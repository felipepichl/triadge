// Ensure environment variables are loaded
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

// Validate required environment variables
if (!process.env.SECRET_TOKEN) {
  throw new Error('SECRET_TOKEN environment variable is required')
}

if (!process.env.SECRET_REFRESH_TOKEN) {
  throw new Error('SECRET_REFRESH_TOKEN environment variable is required')
}

const authConfig = {
  secretToken: process.env.SECRET_TOKEN,
  expiresInToken: process.env.EXPIRES_IN_TOKEN || '15m',
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
  expiresInRefreshToken: process.env.EXPIRES_IN_REFRESH_TOKEN || '30d',
  expiresRefreshTokenDays:
    Number(process.env.EXPIRES_IN_REFRESH_TOKEN_DAYS) || 30,
}

export { authConfig }
