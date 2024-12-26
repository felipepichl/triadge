import { AUTH_TOKEN_STORAGE } from '@/storage/storage-config'

export function storageAuthTokenSave(token: string) {
  localStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export function storageAuthTokenGet(): string | null {
  return localStorage.getItem(AUTH_TOKEN_STORAGE)
}
