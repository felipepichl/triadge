import { UniqueEntityID } from './UniqueEntityID'

abstract class Entity<T> {
  protected readonly _id: UniqueEntityID

  protected readonly props: T

  constructor(props: T, id?: UniqueEntityID | string) {
    this._id = id instanceof UniqueEntityID ? id : new UniqueEntityID(id)
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof Entity)) {
      return false
    }

    return this._id.equals(object._id)
  }

  public toJSON(): Record<string, unknown> {
    return {
      _id: this._id.toValue(),
      ...this.props,
    }
  }
}

export { Entity }
