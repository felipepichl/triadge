import { CreateSubcategoryDTO } from '@/dtos/subcategory-dto'
import { api } from '@/lib/axios'

export async function apiCreateSubcategory({
  description,
  parentCategoryId,
}: CreateSubcategoryDTO): Promise<void> {
  await api.post('/financial-category/subcategory', {
    description,
    parentCategoryId,
  })
}
