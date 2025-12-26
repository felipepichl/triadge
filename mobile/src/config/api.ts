import Constants from 'expo-constants'

export const getApiConfig = () => {
  const isDevelopment = __DEV__

  if (isDevelopment) {
    // Check for Expo tunnel first
    const { manifest } = Constants
    const hostUri = manifest?.hostUri

    console.log('🔍 Environment check:', {
      __DEV__: __DEV__,
      hostUri,
      platform: Constants.platform,
      expoVersion: Constants.expoVersion,
    })

    if (
      hostUri &&
      (hostUri.includes('exp.direct') || hostUri.includes('expo.dev'))
    ) {
      // Running on Expo Go with tunnel
      const tunnelDomain = hostUri.split(':')[0]
      const apiUrl = `https://${tunnelDomain.replace(/\d+$/, '3331')}`
      console.log('🚀 Using Expo tunnel API URL:', apiUrl)
      return { apiUrl, isTunnel: true }
    }

    // For development: use machine IP (works on simulators/emulators and physical devices)
    // localhost may not work from simulator/emulator as it refers to the mobile device itself
    const machineIP = '192.168.1.4' // Replace with your machine's IP address
    const apiUrl = `http://${machineIP}:3331`
    console.log('💻 Development mode: using machine IP for API')
    console.log('🏠 Using machine IP API URL:', apiUrl)
    console.log('💡 Make sure your machine IP is accessible from the mobile device/simulator')
    console.log('💡 If using iOS Simulator: localhost should work')
    console.log('💡 If using Android Emulator: use 10.0.2.2 instead of machine IP')
    return { apiUrl, isTunnel: false }
  }

  // Production
  const apiUrl = 'https://api.triadge.com'
  console.log('🏭 Using production API URL:', apiUrl)
  return { apiUrl, isTunnel: false }
}

export const API_TIMEOUT = 10000 // 10 seconds
