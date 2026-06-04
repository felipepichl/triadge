import { z } from 'zod'

const createTransactionSchema = z.object({
  description: z.string().min(1),
  detail: z.string().optional(),
  type: z.enum(['income', 'outcome']),
  date: z.string().or(z.date()).optional(),
  amount: z.number().positive(),
  financialCategoryId: z.string().uuid(),
  subcategoryId: z.string().uuid().optional(),
})

const dateRangeQuerySchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
})

const transactionTypeQuerySchema = z.object({
  type: z.enum(['income', 'outcome']),
})

const monthQuerySchema = z.object({
  month: z.string().regex(/^\d{1,2}$/).transform(Number).pipe(z.number().int().min(1).max(12)),
  year: z.string().regex(/^\d{4}$/).transform(Number).pipe(z.number().int().min(2000)).optional(),
})

export {
  createTransactionSchema,
  dateRangeQuerySchema,
  monthQuerySchema,
  transactionTypeQuerySchema,
}
