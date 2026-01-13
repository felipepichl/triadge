import { useEffect, useRef } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import type { StackNavigatorRoutesProps } from '@/routes/app/stack.routes'

/**
 * NotificationNavigationHandler
 * 
 * Component that handles navigation when user taps on notifications.
 * Must be inside NavigationContainer to access navigation context.
 */
export function NotificationNavigationHandler() {
  const navigation = useNavigation<StackNavigatorRoutesProps>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    // Setup notification response listener (when user taps notification)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data

        // Navigate to AccountPayable tab when account due notification is tapped
        if (data?.type === 'account_due') {
          // Navigate to tabs screen, then to accountPayable tab
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'tabs',
                  state: {
                    routes: [
                      {
                        name: 'accountPayable',
                      },
                    ],
                    index: 0,
                  },
                },
              ],
            }),
          )
        }
      })

    // Cleanup listener on unmount
    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [navigation])

  // This component doesn't render anything
  return null
}
