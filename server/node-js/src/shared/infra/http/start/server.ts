import 'reflect-metadata'

import { app } from './app'

const server = app.listen(3331, () => {
  console.log('✅ Server running in port 3331')
  console.log('🌐 Listening on http://localhost:3331')
  console.log('🏥 Health check: http://localhost:3331/health')
})

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error.message)
  process.exit(1)
})

server.on('listening', () => {
  console.log('🎧 Server is actually listening on port 3331')
})
