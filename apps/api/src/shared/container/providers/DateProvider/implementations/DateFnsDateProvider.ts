import { addDays, addHours } from 'date-fns'

import { IDateProvider } from '../models/IDateProvider'

class DateFnsDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return addDays(new Date(), days)
  }

  addHours(hours: number): Date {
    return addHours(new Date(), hours)
  }
}

export { DateFnsDateProvider }
