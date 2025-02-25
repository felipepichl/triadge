import { brapi } from '@shared/lib/axios'

interface IBrapiQuoteTickersBody {
  ticket: string
}

interface IBrapiQuoteTickersResponse {
  results: {
    shortName: string
    symbol: string
  }[]
}

interface IBbrapiQuoteTickersDTO {
  shortName: string
  symbol: string
}

export async function brapiQuoteTickers({
  ticket,
}: IBrapiQuoteTickersBody): Promise<IBbrapiQuoteTickersDTO> {
  // const data = brapi.get(`/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`)
  const { data } = await brapi.get<IBrapiQuoteTickersResponse>(
    `/quote/${ticket}?token=ga7GdaD5rpNB8MHmRmYdpf`,
  )

  const { shortName, symbol } = data.results[0]

  return { shortName, symbol }
}
