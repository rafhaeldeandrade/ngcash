export type LoadUserInput = string

export type LoadUserOutput = {
  id: number
  username: string
  accountId: number
}

export interface LoadUser {
  execute: (input: LoadUserInput) => Promise<LoadUserOutput>
}
