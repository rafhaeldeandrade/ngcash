import { User } from '@/domain/entitities/user'

export interface UserRepository {
  getUserByUsername(username: string): Promise<User>
}
