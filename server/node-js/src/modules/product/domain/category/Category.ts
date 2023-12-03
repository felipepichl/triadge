import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface ICategoryProps {
  id?: string
  name: string
  description: string
}

class Category extends AggregateRoot<ICategoryProps> {
  constructor(props: ICategoryProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  public static createCategory({
    id,
    name,
    description,
  }: ICategoryProps): Category {
    const categoryProps = {
      name,
      description,
    }

    return AggregateRoot.create({ props: categoryProps, id }, Category)
  }
}

export { Category }
