import 'reflect-metadata'

import { app } from './app'

<<<<<<< HEAD
const server = app.listen(3331, () => {
  console.log('✅ Server running in port 3331')
})

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error.message)
  process.exit(1)
})

server.on('listening', () => {
  // Server started successfully
=======
app.listen(3333, () => {
  console.log('Server running in port 3333')
>>>>>>> 9ba6268 (fix: interest paid to account payable)
})
