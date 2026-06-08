import { SubcategoryDetailDTO, SubcategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export async function apiListSubcategories(
  parentCategoryId: string,
): Promise<SubcategoryDetailDTO[]> {
  const { data } = await api.get<{
    subcategories: SubcategoryResponseDTO[]
  }>(`/financial-category/subcategory/${parentCategoryId}`)

  return data.subcategories
}
