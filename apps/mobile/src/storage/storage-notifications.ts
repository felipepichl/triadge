import AsyncStorage from '@react-native-async-storage/async-storage'

const NOTIFICATIONS_STORAGE = '@triadge:notifications'

export type NotificationStorageData = {
  [accountId: string]: string // accountId -> notificationId
}

export async function storageNotificationsSave(
  notifications: NotificationStorageData,
): Promise<void> {
  await AsyncStorage.setItem(
    NOTIFICATIONS_STORAGE,
    JSON.stringify(notifications),
  )
}

export async function storageNotificationsGet(): Promise<NotificationStorageData> {
  const storage = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE)

  const notifications: NotificationStorageData = storage
    ? JSON.parse(storage)
    : {}

  return notifications
}

export async function storageNotificationsRemove(): Promise<void> {
  await AsyncStorage.removeItem(NOTIFICATIONS_STORAGE)
}

export async function storageNotificationAdd(
  accountId: string,
  notificationId: string,
): Promise<void> {
  const notifications = await storageNotificationsGet()
  notifications[accountId] = notificationId
  await storageNotificationsSave(notifications)
}

export async function storageNotificationRemove(
  accountId: string,
): Promise<void> {
  const notifications = await storageNotificationsGet()
  delete notifications[accountId]
  await storageNotificationsSave(notifications)
}

export async function storageNotificationGet(
  accountId: string,
): Promise<string | null> {
  const notifications = await storageNotificationsGet()
  return notifications[accountId] || null
}
