import { UniqueEntityID } from './UniqueEntityID'

interface ICreateProps<T> {
  props: Omit<T, 'created_at' | 'updated_at'> & {
    created_at?: Date
    updated_at?: Date
  }
  id?: UniqueEntityID | string
}

export { ICreateProps }
