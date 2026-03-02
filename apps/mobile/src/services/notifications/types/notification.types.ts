export type NotificationScheduleParams = {
  accountId: string
  description: string
  amount: number
  dueDate: Date
}

export type NotificationHandlerResult = {
  shouldShowAlert: boolean
  shouldPlaySound: boolean
  shouldSetBadge: boolean
}
