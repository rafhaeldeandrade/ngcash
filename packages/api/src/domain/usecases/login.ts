export type LoginInput = {
  username: string
  password: string
}

export type LoginOutput = {
  accessToken: string
  userId: number
  accountId: number
}

export interface Login {
  execute: (input: LoginInput) => Promise<LoginOutput>
}
