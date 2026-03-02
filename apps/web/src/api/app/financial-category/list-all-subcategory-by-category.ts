import { SubcategoryDetailDTO, SubcategoryResponseDTO } from '@umabel/core'

import { api } from '@/lib/axios'

export type SubcategoryBody = {
  parentCategoryId: string
}

export async function apiListAllSubcategoryByCategory({
  parentCategoryId,
}: SubcategoryBody): Promise<SubcategoryDetailDTO[]> {
  const { data } = await api.get<{
    subcategories: SubcategoryResponseDTO[]
  }>(`/financial-category/subcategory/${parentCategoryId}`)

  return data.subcategories.map(({ _id, props: { description } }) => ({
    _id,
    description,
  }))
}
