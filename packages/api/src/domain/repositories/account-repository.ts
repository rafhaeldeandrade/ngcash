import { Decimal } from '@prisma/client/runtime'
import { Account } from '../entitities/account'

export type GetBalanceOutput = {
  balance: Decimal
}
export interface AccountRepository {
  getBalance(accountId: number): Promise<GetBalanceOutput | null>
  incrementBalance(accountId: number, amount: Decimal): Promise<Account>
  decrementBalance(accountId: number, amount: Decimal): Promise<Account>
}
