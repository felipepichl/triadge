import { useCallback, useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'

import { AccountPayableDetailDTO } from '@/dtos/AccountPayableDTO'
import { notificationService } from '@/services/notifications/notification.service'
import { notificationSchedulerService } from '@/services/notifications/notification-scheduler.service'
import { notificationSyncService } from '@/services/notifications/notification-sync.service'

type NotificationListener = (notification: Notifications.Notification) => void
type NotificationResponseListener = (
  response: Notifications.NotificationResponse,
) => void

/**
 * Hook for managing account payable notifications
 * 
 * Provides functions to:
 * - Request permissions
 * - Schedule/cancel notifications
 * - Sync with backend
 * - Handle notification events
 */
export function useAccountPayableNotifications() {
  const [hasPermissions, setHasPermissions] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  /**
   * Request notification permissions
   */
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const granted = await notificationService.requestPermissions()
    setHasPermissions(granted)
    return granted
  }, [])

  /**
   * Check if permissions are granted
   */
  const checkPermissions = useCallback(async (): Promise<boolean> => {
    const granted = await notificationService.hasPermissions()
    setHasPermissions(granted)
    return granted
  }, [])

  /**
   * Initialize notifications
   * Should be called once when app starts
   */
  const initialize = useCallback(async (): Promise<void> => {
    try {
      // Configure notification handler
      notificationService.configureHandler()

      // Check permissions
      const granted = await checkPermissions()

      if (granted) {
        // Sync notifications with backend
        await notificationSyncService.syncNotifications()
      }

      setIsInitialized(true)
    } catch (error) {
      console.error('Error initializing notifications:', error)
      setIsInitialized(true) // Set to true even on error to prevent retry loops
    }
  }, [checkPermissions])

  /**
   * Schedule notification for an account
   */
  const scheduleNotification = useCallback(
    async (account: AccountPayableDetailDTO): Promise<void> => {
      if (!hasPermissions) {
        console.warn('Notification permissions not granted')
        return
      }

      if (account.isPaid) {
        return
      }

      await notificationSchedulerService.scheduleNotification({
        accountId: account._id,
        description: account.description,
        amount: account.amount,
        dueDate: account.dueDate,
      })
    },
    [hasPermissions],
  )

  /**
   * Cancel notification for an account
   */
  const cancelNotification = useCallback(
    async (accountId: string): Promise<void> => {
      await notificationSchedulerService.cancelNotification(accountId)
    },
    [],
  )

  /**
   * Sync notifications with backend
   */
  const syncNotifications = useCallback(async (): Promise<void> => {
    if (!hasPermissions) {
      return
    }

    await notificationSyncService.syncNotifications()
  }, [hasPermissions])

  /**
   * Sync notification for a specific account
   */
  const syncAccountNotification = useCallback(
    async (account: AccountPayableDetailDTO): Promise<void> => {
      if (!hasPermissions) {
        return
      }

      await notificationSyncService.syncAccountNotification(account)
    },
    [hasPermissions],
  )

  /**
   * Setup listener for notifications received while app is in foreground
   */
  const setupForegroundListener = useCallback(
    (listener: NotificationListener) => {
      return Notifications.addNotificationReceivedListener(listener)
    },
    [],
  )

  /**
   * Setup listener for when user taps on a notification
   */
  const setupResponseListener = useCallback(
    (listener: NotificationResponseListener) => {
      return Notifications.addNotificationResponseReceivedListener(listener)
    },
    [],
  )

  // Check permissions on mount
  useEffect(() => {
    checkPermissions()
  }, [checkPermissions])

  return {
    hasPermissions,
    isInitialized,
    requestPermissions,
    checkPermissions,
    initialize,
    scheduleNotification,
    cancelNotification,
    syncNotifications,
    syncAccountNotification,
    setupForegroundListener,
    setupResponseListener,
  }
}
