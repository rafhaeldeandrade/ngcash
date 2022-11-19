export interface AccountRepository {
  getBalance(accountId: number): Promise<number | null>
}
