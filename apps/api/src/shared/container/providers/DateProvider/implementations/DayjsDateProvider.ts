import dayjs from 'dayjs'

import { IDateProvider } from '../models/IDateProvider'

class DayjsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate()
  }
}

export { DayjsDateProvider }
