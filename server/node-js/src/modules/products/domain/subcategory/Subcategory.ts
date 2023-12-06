import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface ISubcategoryProps {
  id?: string
  name: string
  description: string
  categoryId: string
}

class Subcategory extends AggregateRoot<ISubcategoryProps> {
  constructor(props: ISubcategoryProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  public static createSubcategory({
    id,
    name,
    description,
    categoryId,
  }: ISubcategoryProps): Subcategory {
    const subcategoryProps = {
      name,
      description,
      categoryId,
    }

    return AggregateRoot.create({ props: subcategoryProps, id }, Subcategory)
  }
}

export { Subcategory }
