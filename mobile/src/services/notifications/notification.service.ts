import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { NotificationHandlerResult } from './types/notification.types'

/**
 * NotificationService
 * 
 * Core service for managing notification permissions, handlers, and listeners.
 * Handles foreground, background, and quit state notifications.
 */
class NotificationService {
  /**
   * Configure notification handler for foreground notifications
   * This determines how notifications are displayed when app is open
   */
  configureHandler(): void {
    Notifications.setNotificationHandler({
      handleNotification: async (): Promise<NotificationHandlerResult> => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }
      },
    })
  }

  /**
   * Request notification permissions from the user
   * @returns true if permissions granted, false otherwise
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      // Only ask if permissions have not already been determined
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      // Android specific: need to create notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Notificações',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          // Icon will be automatically used from app.json plugin configuration
        })
      }

      return finalStatus === 'granted'
    } catch (error) {
      console.error('Error requesting notification permissions:', error)
      return false
    }
  }

  /**
   * Check if notification permissions are granted
   * @returns true if permissions granted, false otherwise
   */
  async hasPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync()
      return status === 'granted'
    } catch (error) {
      console.error('Error checking notification permissions:', error)
      return false
    }
  }

  /**
   * Get all scheduled notifications
   * @returns Array of scheduled notifications
   */
  async getAllScheduledNotifications(): Promise<
    Notifications.NotificationRequest[]
  > {
    try {
      return await Notifications.getAllScheduledNotificationsAsync()
    } catch (error) {
      console.error('Error getting scheduled notifications:', error)
      return []
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()
    } catch (error) {
      console.error('Error canceling all notifications:', error)
    }
  }

  /**
   * Cancel a specific notification by ID
   * @param notificationId - ID of the notification to cancel
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId)
    } catch (error) {
      console.error('Error canceling notification:', error)
    }
  }

  /**
   * Get notification badge count
   * @returns Current badge count
   */
  async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync()
    } catch (error) {
      console.error('Error getting badge count:', error)
      return 0
    }
  }

  /**
   * Set notification badge count
   * @param count - Badge count to set
   */
  async setBadgeCount(count: number): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(count)
    } catch (error) {
      console.error('Error setting badge count:', error)
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService()
