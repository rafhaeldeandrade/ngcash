export type AuthenticationInput = {
  username: string
  password: string
}

export type AuthenticationOutput = {
  accessToken: string
}

export interface Authentication {
  execute: (input: AuthenticationInput) => Promise<AuthenticationOutput>
}
