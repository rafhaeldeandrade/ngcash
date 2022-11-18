import { UniqueId } from '@/domain/entitities/user'

export type SignUpUserInput = {
  username: string
  password: string
}

export type SignUpUserOutput = {
  id: UniqueId
  accessToken: string
}

export interface SignUpUser {
  execute: (input: SignUpUserInput) => Promise<SignUpUserOutput>
}
