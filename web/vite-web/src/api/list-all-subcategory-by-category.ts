import { api } from '@/lib/axios'

export type SubcategoryBory = {
  parentCategoryId: string
}

export type SubcategoryResponse = {
  _id: string
  props: {
    description: string
  }
}

export type Subcategory = {
  _id: string
  description: string
}

export async function apiListAllSubcategoryByCategory({
  parentCategoryId,
}: SubcategoryBory): Promise<Subcategory[]> {
  const { data } = await api.get<{
    subcategories: SubcategoryResponse[]
  }>(`/financial-category/subcategory/${parentCategoryId}`)

  return data.subcategories.map(({ _id, props: { description } }) => ({
    _id,
    description,
  }))
}
