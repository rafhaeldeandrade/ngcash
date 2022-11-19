import { Decimal } from '@prisma/client/runtime'

export type GetBalanceOutput = {
  balance: Decimal
}
export interface AccountRepository {
  getBalance(accountId: number): Promise<GetBalanceOutput | null>
}
