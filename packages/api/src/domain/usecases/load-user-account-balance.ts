export type LoadUserAccountBalanceInput = {
  paramsAccountId: number
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
