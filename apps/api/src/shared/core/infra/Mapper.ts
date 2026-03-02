interface IMapper<T, U> {
  toPersistence(object: T): T
  toDomain(raw: U): T
  toDomainArray(rawArray: U[]): T[]
  getMapper(): IMapper<T, U>
}

export { IMapper }
