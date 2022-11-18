export type LoadUserAccountBalanceInput = number

export type LoadUserAccountBalanceOutput = {
  balance: number
}

export interface LoadUserAccountBalance {
  execute: (
    input: LoadUserAccountBalanceInput
  ) => Promise<LoadUserAccountBalanceOutput>
}
