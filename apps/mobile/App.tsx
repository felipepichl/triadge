import '@config/calendarLocale'

import { Loading } from '@components/Loading'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import type { Subscription } from 'expo-notifications'
import { useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'

import { config } from './config/gluestack-ui.config'
import { AuthProvider } from './src/contexts/auth/auth-context'
import { useAccountPayableNotifications } from './src/hooks/useAccountPayableNotifications'
import { Routes } from './src/routes'
import { toast } from './src/utils/toast'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const { initialize, setupForegroundListener, setupResponseListener } =
    useAccountPayableNotifications()
  const notificationListener = useRef<Subscription>()
  const responseListener = useRef<Subscription>()

  useEffect(() => {
    // Initialize notifications when app starts
    initialize()

    // Setup foreground notification listener
    notificationListener.current = setupForegroundListener((notification) => {
      // Show toast when notification is received in foreground
      toast.info(notification.request.content.body || 'Nova notificação')
    })

    // Note: Navigation handling is done by NotificationNavigationHandler
    // component which has access to navigation context

    // Cleanup listeners on unmount
    return () => {
      notificationListener.current?.remove()
      responseListener.current?.remove()
    }
  }, [initialize, setupForegroundListener, setupResponseListener])

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthProvider>

      <Toast />
    </GluestackUIProvider>
  )
}
