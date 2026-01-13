import { addDays, startOfDay } from 'date-fns'

import { apiListUnpaidAccountsPayable } from '@/api/app/accounts-payable/list-unpaid'
import { AccountPayableDetailDTO } from '@/dtos/AccountPayableDTO'
import { notificationRepository } from '@/repositories/notifications/notification.repository'
import { notificationSchedulerService } from './notification-scheduler.service'

/**
 * NotificationSyncService
 * 
 * Service for synchronizing notifications with backend data.
 * Ensures local notifications match server state.
 */
class NotificationSyncService {
  /**
   * Number of days in the future to sync notifications for
   */
  private readonly SYNC_DAYS_AHEAD = 30

  /**
   * Sync notifications with backend
   * Fetches unpaid accounts and schedules/cancels notifications accordingly
   * This syncs accounts from multiple months to ensure all upcoming due dates are covered
   */
  async syncNotifications(): Promise<void> {
    try {
      // Fetch unpaid accounts from current month and next month
      const today = new Date()
      const currentMonth = today.getMonth() + 1
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1

      const [currentMonthAccounts, nextMonthAccounts] = await Promise.all([
        apiListUnpaidAccountsPayable({ month: currentMonth }),
        apiListUnpaidAccountsPayable({ month: nextMonth }),
      ])

      // Combine accounts from both months
      const allAccounts = [
        ...currentMonthAccounts.accountsPayable,
        ...nextMonthAccounts.accountsPayable,
      ]

      // Get currently scheduled notifications
      const scheduledNotifications =
        await notificationRepository.getAllNotifications()

      // Create a set of account IDs from backend
      const backendAccountIds = new Set(
        allAccounts
          .filter((account) => !account.isPaid)
          .map((account) => account._id),
      )

      // Schedule notifications for accounts that need them
      for (const account of allAccounts) {
        if (!account.isPaid && this.shouldScheduleNotification(account)) {
          const existingNotificationId = scheduledNotifications[account._id]

          // Only schedule if not already scheduled
          if (!existingNotificationId) {
            await notificationSchedulerService.scheduleNotification({
              accountId: account._id,
              description: account.description,
              amount: account.amount,
              dueDate: account.dueDate,
            })
          }
        }
      }

      // Cancel notifications for accounts that are now paid or don't exist
      for (const accountId in scheduledNotifications) {
        if (!backendAccountIds.has(accountId)) {
          await notificationSchedulerService.cancelNotification(accountId)
        }
      }
    } catch (error) {
      console.error('Error syncing notifications:', error)
      // Don't throw - allow app to continue functioning
    }
  }

  /**
   * Check if notification should be scheduled for an account
   * @param account - Account payable to check
   * @returns true if notification should be scheduled
   */
  private shouldScheduleNotification(
    account: AccountPayableDetailDTO,
  ): boolean {
    const now = startOfDay(new Date())
    const dueDate = startOfDay(account.dueDate)
    const maxDate = addDays(now, this.SYNC_DAYS_AHEAD)

    // Schedule if due date is in the future and within sync window
    return dueDate >= now && dueDate <= maxDate
  }

  /**
   * Sync notifications for a specific account
   * Useful after creating or updating an account
   * @param account - Account payable to sync
   */
  async syncAccountNotification(account: AccountPayableDetailDTO): Promise<void> {
    try {
      if (account.isPaid) {
        // Cancel notification if account is paid
        await notificationSchedulerService.cancelNotification(account._id)
      } else if (this.shouldScheduleNotification(account)) {
        // Schedule or reschedule notification
        await notificationSchedulerService.scheduleNotification({
          accountId: account._id,
          description: account.description,
          amount: account.amount,
          dueDate: account.dueDate,
        })
      }
    } catch (error) {
      console.error('Error syncing account notification:', error)
    }
  }
}

// Export singleton instance
export const notificationSyncService = new NotificationSyncService()
