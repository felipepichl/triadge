import { CreateFinancialCategoryDTO } from '@/dtos/financial-category-dto'
import { api } from '@/lib/axios'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  await api.post('/financial-category', { description })
}
