import { UserDTO } from '@/dtos/UserDTO'
import { USER_STORAGE } from '@/storage/storage-config'

export function storageUserSave(user: UserDTO) {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export function storageUserGet(): UserDTO {
  const storage = localStorage.getItem(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}
