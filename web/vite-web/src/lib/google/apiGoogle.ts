import axios from 'axios'

export const apiGoogleData = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
})

export const apiGoogleAnalytics = axios.create({
  baseURL: 'https://youtubeanalytics.googleapis.com/v2',
})
