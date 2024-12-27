export type CreateSubcategoryDTO = {
  description: string
  parentCategoryId: string
}

export type SubcategoryDetailDTO = {
  _id: string
  description: string
}

export type SubcategoryResponseDTO = {
  _id: string
  props: {
    description: string
  }
}
