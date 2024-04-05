import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface ICategoryProps {
  id?: string
  description: string
}

class Category extends AggregateRoot<ICategoryProps> {
  constructor(props: ICategoryProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  public static createCategory({ id, description }: ICategoryProps): Category {
    const categoryProps = {
      description,
    }

    return AggregateRoot.create({ props: categoryProps, id }, Category)
  }
}

export { Category }
