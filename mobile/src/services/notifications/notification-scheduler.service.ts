import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as Notifications from 'expo-notifications'

import { notificationRepository } from '@/repositories/notifications/notification.repository'

import { notificationService } from './notification.service'
import { NotificationScheduleParams } from './types/notification.types'

/**
 * NotificationSchedulerService
 *
 * Service for scheduling and canceling account payable due date notifications.
 * Handles notification creation, scheduling, and cancellation logic.
 */
class NotificationSchedulerService {
  /**
   * Default notification time (8:00 AM)
   */
  private readonly DEFAULT_NOTIFICATION_HOUR = 8
  private readonly DEFAULT_NOTIFICATION_MINUTE = 0

  /**
   * Format amount to Brazilian currency
   * @param amount - Amount to format
   * @returns Formatted amount string
   */
  private formatAmount(amount: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }

  /**
   * Create notification date with default time
   * @param dueDate - Account due date
   * @returns Date object with notification time set
   */
  private createNotificationDate(dueDate: Date): Date {
    const notificationDate = new Date(dueDate)
    notificationDate.setHours(this.DEFAULT_NOTIFICATION_HOUR)
    notificationDate.setMinutes(this.DEFAULT_NOTIFICATION_MINUTE)
    notificationDate.setSeconds(0)
    notificationDate.setMilliseconds(0)

    // If due date is in the past, schedule for tomorrow at 8 AM
    const now = new Date()
    if (notificationDate < now) {
      notificationDate.setDate(notificationDate.getDate() + 1)
    }

    return notificationDate
  }

  /**
   * Schedule a notification for an account payable due date
   * @param params - Notification schedule parameters
   * @returns Scheduled notification ID or null if failed
   */
  async scheduleNotification(
    params: NotificationScheduleParams,
  ): Promise<string | null> {
    try {
      const { accountId, description, amount, dueDate } = params

      // Check if notification already exists
      const existingNotificationId =
        await notificationRepository.getNotificationId(accountId)

      if (existingNotificationId) {
        // Cancel existing notification before creating new one
        await this.cancelNotification(accountId)
      }

      // Create notification date
      const notificationDate = this.createNotificationDate(dueDate)

      // Format notification content
      const formattedAmount = this.formatAmount(amount)
      const formattedDate = format(dueDate, "dd 'de' MMMM", { locale: ptBR })

      // Schedule notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Conta a vencer',
          body: `${description} - ${formattedAmount} vence em ${formattedDate}`,
          data: {
            accountId,
            type: 'account_due',
          },
          sound: true,
          badge: 1,
        },
        trigger: {
          date: notificationDate,
        },
      })

      // Save notification ID
      await notificationRepository.saveNotificationId(accountId, notificationId)

      return notificationId
    } catch (error) {
      console.error('Error scheduling notification:', error)
      return null
    }
  }

  /**
   * Cancel a notification for an account
   * @param accountId - Account payable ID
   */
  async cancelNotification(accountId: string): Promise<void> {
    try {
      const notificationId =
        await notificationRepository.getNotificationId(accountId)

      if (notificationId) {
        await notificationService.cancelNotification(notificationId)
        await notificationRepository.removeNotificationId(accountId)
      }
    } catch (error) {
      console.error('Error canceling notification:', error)
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await notificationService.cancelAllNotifications()
      await notificationRepository.clearAll()
    } catch (error) {
      console.error('Error canceling all notifications:', error)
    }
  }

  /**
   * Reschedule notification for an account
   * Useful when account due date is updated
   * @param params - Notification schedule parameters
   */
  async rescheduleNotification(
    params: NotificationScheduleParams,
  ): Promise<string | null> {
    // Cancel existing and create new
    await this.cancelNotification(params.accountId)
    return await this.scheduleNotification(params)
  }
}

// Export singleton instance
export const notificationSchedulerService = new NotificationSchedulerService()
