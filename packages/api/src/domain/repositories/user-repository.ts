import { User } from '@/domain/entitities/user'

export type SaveNewUserInput = {
  username: string
  password: string
}

export type SaveNewUserOutput = User

export interface UserRepository {
  findUserByUsername(username: string): Promise<User | null>
  saveNewUser(input: SaveNewUserInput): Promise<SaveNewUserOutput>
  updateAccessToken(userId: number, accessToken: string): Promise<User | null>
  findUserByAccessToken(accessToken: string): Promise<User | null>
  findUserById(userId: number): Promise<User | null>
}
