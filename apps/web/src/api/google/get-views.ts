import { apiGoogleAnalytics } from '@/lib/google/apiGoogle'

const YOUR_CHANNEL_ID = 'UCvy99x_WM_fIKz-8TkVUJfA'

export async function apiGoogleAnalyticsGetViews(): Promise<void> {
  const response = await apiGoogleAnalytics.get(
    `/reports?ids=channel==${YOUR_CHANNEL_ID}&startDate=2024-01-01&endDate=2024-12-25&metrics=views`,
  )

  console.log(response)
}
