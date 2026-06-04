import { UniqueEntityID } from './UniqueEntityID'

interface ICreateProps<T> {
  props: T
  id?: UniqueEntityID | string
}

export { ICreateProps }
