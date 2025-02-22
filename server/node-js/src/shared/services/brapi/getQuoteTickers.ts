import { brapi } from '@shared/lib/axios'

interface brapiQuoteTickersBody {
  ticket: string
}

export async function brapiQuoteTickers({ ticket }: brapiQuoteTickersBody) {
  const data = brapi.get(`/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`)

  console.log(data)
}
