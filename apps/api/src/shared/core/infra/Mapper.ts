interface IMapper<T, U> {
  toDomain(raw: U): T
  toDomainArray(rawArray: U[]): T[]
  getMapper(): IMapper<T, U>
}

export { IMapper }
