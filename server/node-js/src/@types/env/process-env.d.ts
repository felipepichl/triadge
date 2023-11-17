declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SECRET_TOKEN: string
    SECRET_REFRESH_TOKEN: string
    EXPIRES_IN_TOKEN: string
    EXPIRES_IN_REFRESH_TOKEN: string
    EXPIRES_IN_REFRESH_TOKEN_DAYS: number
  }
}
