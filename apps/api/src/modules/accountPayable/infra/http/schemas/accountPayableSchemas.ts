import { z } from 'zod'

const createAccountPayableSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  dueDate: z.string().or(z.date()),
  financialCategoryId: z.string().uuid(),
  subcategoryId: z.string().uuid().optional(),
  installments: z.number().int().positive().optional(),
})

const createFixedAccountPayableSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  dueDate: z.string().or(z.date()),
  financialCategoryId: z.string().uuid(),
  subcategoryId: z.string().uuid().optional(),
})

const monthQuerySchema = z.object({
  month: z.string().regex(/^\d{1,2}$/).transform(Number).pipe(z.number().int().min(1).max(12)),
})

const accountPayableIdParamSchema = z.object({
  id: z.string().uuid(),
})

const updateAmountSchema = z.object({
  amount: z.number().positive(),
})

export {
  accountPayableIdParamSchema,
  createAccountPayableSchema,
  createFixedAccountPayableSchema,
  monthQuerySchema,
  updateAmountSchema,
}
