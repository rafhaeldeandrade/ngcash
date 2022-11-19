export type LoadUserAccountBalanceInput = {
  queryAccountId: number
  authAccountId: number
}

export type LoadUserAccountBalanceOutput = {
  balance: number
}

export interface LoadUserAccountBalance {
  execute: (
    input: LoadUserAccountBalanceInput
  ) => Promise<LoadUserAccountBalanceOutput>
}
