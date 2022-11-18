export type LoginInput = {
  username: string
  password: string
}

export type LoginOutput = {
  accessToken: string
}

export interface Login {
  execute: (input: LoginInput) => Promise<LoginOutput>
}
