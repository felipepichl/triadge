import { z } from 'zod'

const buyStockSchema = z.object({
  symbol: z.string().min(1),
  price: z.number().positive(),
  date: z.string().or(z.date()).optional(),
  quantity: z.number().int().positive(),
  type: z.enum(['stock', 'fii']),
})

const sellStockSchema = z.object({
  symbol: z.string().min(1),
  price: z.number().positive(),
  date: z.string().or(z.date()).optional(),
  quantity: z.number().int().positive(),
})

const stockTypeQuerySchema = z.object({
  type: z.enum(['stock', 'fii']),
})

const monthQuerySchema = z.object({
  month: z.string().regex(/^\d{1,2}$/).transform(Number).pipe(z.number().int().min(1).max(12)),
  year: z.string().regex(/^\d{4}$/).transform(Number).pipe(z.number().int().min(2000)).optional(),
})

export { buyStockSchema, monthQuerySchema, sellStockSchema, stockTypeQuerySchema }
