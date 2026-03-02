import * as Notifications from 'expo-notifications'
import { Alert } from 'react-native'

/**
 * Test notification utility
 *
 * Use this to test notifications while app is in background/quit state
 * Schedules notification for 10 seconds - enough time to lock/minimize the app
 */
export async function testNotification(): Promise<void> {
  try {
    // Request permissions first
    const { status } = await Notifications.getPermissionsAsync()

    if (status !== 'granted') {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync()
      if (newStatus !== 'granted') {
        console.warn('Notification permissions not granted')
        return
      }
    }

    // Schedule a test notification for 10 seconds from now
    // This gives you time to lock/minimize the app
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Conta a vencer',
        body: 'Aluguel - R$ 1.500,00 vence em 15 de janeiro',
        data: {
          accountId: 'test-account-id',
          type: 'account_due',
        },
        sound: true,
        badge: 1,
      },
      trigger: {
        seconds: 10, // Show notification in 10 seconds
      },
    })

    console.log('✅ Test notification scheduled for 10 seconds from now')
    console.log('💡 BLOQUEIE ou MINIMIZE o app AGORA para ver a notificação!')

    // Show alert to user
    Alert.alert(
      'Notificação Agendada',
      'Notificação agendada para 10 segundos!\n\nBLOQUEIE ou MINIMIZE o app agora para ver a notificação quando ela aparecer.',
    )
  } catch (error) {
    console.error('Error scheduling test notification:', error)
  }
}

/**
 * Show immediate test notification (for foreground testing)
 */
export async function testNotificationImmediate(): Promise<void> {
  try {
    // Request permissions first
    const { status } = await Notifications.getPermissionsAsync()

    if (status !== 'granted') {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync()
      if (newStatus !== 'granted') {
        console.warn('Notification permissions not granted')
        return
      }
    }

    // Present notification immediately (only works in foreground)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Conta a vencer',
        body: 'Aluguel - R$ 1.500,00 vence em 15 de janeiro',
        data: {
          accountId: 'test-account-id',
          type: 'account_due',
        },
        sound: true,
        badge: 1,
      },
      trigger: null, // null = immediate
    })

    console.log('✅ Test notification shown immediately')
  } catch (error) {
    console.error('Error showing test notification:', error)
  }
}
