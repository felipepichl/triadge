import { Entity } from './Entity'
import { ICreateProps } from './ICreateProps'
import { UniqueEntityID } from './UniqueEntityID'

abstract class AggregateRoot<T> extends Entity<T> {
  get id(): UniqueEntityID {
    return this._id
  }

  public static create<T, U>(
    params: ICreateProps<U>,
    Clazz: new (props: U, id?: UniqueEntityID | string) => T,
  ) {
    const { props, id } = params

    const updatedProps = {
      ...props,
      created_at: props.created_at ?? new Date(),
      updated_at: props.updated_at ?? new Date(),
    } as U

    const uniqueId = id

    const instance = new Clazz(updatedProps, uniqueId)

    return instance
  }
}

export { AggregateRoot }
