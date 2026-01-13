import {
  storageNotificationAdd,
  storageNotificationGet,
  storageNotificationRemove,
  storageNotificationsGet,
  storageNotificationsRemove,
  storageNotificationsSave,
} from '@/storage/storage-notifications'

/**
 * NotificationRepository
 *
 * Repository for managing notification data in AsyncStorage.
 * Handles persistence of notification IDs mapped to account IDs.
 */
class NotificationRepository {
  /**
   * Save notification ID for an account
   * @param accountId - Account payable ID
   * @param notificationId - Scheduled notification ID
   */
  async saveNotificationId(
    accountId: string,
    notificationId: string,
  ): Promise<void> {
    await storageNotificationAdd(accountId, notificationId)
  }

  /**
   * Get notification ID for an account
   * @param accountId - Account payable ID
   * @returns Notification ID or null if not found
   */
  async getNotificationId(accountId: string): Promise<string | null> {
    return await storageNotificationGet(accountId)
  }

  /**
   * Remove notification ID for an account
   * @param accountId - Account payable ID
   */
  async removeNotificationId(accountId: string): Promise<void> {
    await storageNotificationRemove(accountId)
  }

  /**
   * Get all notification mappings
   * @returns Object mapping account IDs to notification IDs
   */
  async getAllNotifications(): Promise<Record<string, string>> {
    return await storageNotificationsGet()
  }

  /**
   * Clear all notification mappings
   */
  async clearAll(): Promise<void> {
    await storageNotificationsRemove()
  }
}

// Export singleton instance
export const notificationRepository = new NotificationRepository()
