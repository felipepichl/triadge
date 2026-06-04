import { z } from 'zod'

const createFinancialCategorySchema = z.object({
  description: z.string().min(1),
})

const createSubcategorySchema = z.object({
  description: z.string().min(1),
  parentCategoryId: z.string().uuid(),
})

const parentCategoryIdParamSchema = z.object({
  parentCategoryId: z.string().uuid(),
})

const totalSpentQuerySchema = z.object({
  type: z.enum(['income', 'outcome']),
  month: z.string().regex(/^\d{1,2}$/).transform(Number).pipe(z.number().int().min(1).max(12)),
  year: z.string().regex(/^\d{4}$/).transform(Number).pipe(z.number().int().min(2000)).optional(),
})

const monthQuerySchema = z.object({
  month: z.string().regex(/^\d{1,2}$/).transform(Number).pipe(z.number().int().min(1).max(12)),
  year: z.string().regex(/^\d{4}$/).transform(Number).pipe(z.number().int().min(2000)).optional(),
})

export {
  createFinancialCategorySchema,
  createSubcategorySchema,
  monthQuerySchema,
  parentCategoryIdParamSchema,
  totalSpentQuerySchema,
}
