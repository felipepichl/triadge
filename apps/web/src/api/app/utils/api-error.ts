class ApiError extends Error {
  // public readonly message: string

  public readonly statusCode?: number

  // constructor(message: string, statusCode = 400) {
  //   this.message = message
  //   this.statusCode = statusCode
  // }

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export { ApiError }
