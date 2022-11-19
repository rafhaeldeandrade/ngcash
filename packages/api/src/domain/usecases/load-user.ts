import { User } from '@/domain/entitities/user'

export type LoadUserInput = string

export type LoadUserOutput = User

export interface LoadUser {
  execute: (input: LoadUserInput) => Promise<LoadUserOutput>
}
