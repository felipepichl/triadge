import { CreateFinancialCategoryDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiCreateFinancialCategory({
  description,
}: CreateFinancialCategoryDTO): Promise<void> {
  await api.post('/financial-category', { description })
}
