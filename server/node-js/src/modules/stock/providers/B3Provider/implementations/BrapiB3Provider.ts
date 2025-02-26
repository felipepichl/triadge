import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'
import { brapi } from '../services/brapi'

class BrapiB3Provider implements IB3Provider {
  async getQuoteTickers(ticket: string): Promise<IB3DTO> {
    const { data } = await brapi.get(
      `/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`,
    )

    const { shortName, symbol } = data.results[0]

    return { shortName, symbol }
  }
}

export { BrapiB3Provider }
