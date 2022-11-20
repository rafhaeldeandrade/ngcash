import { Decimal } from '@prisma/client/runtime'

export interface TransactionRepository {
  saveTransaction(fromId: number, toId: number, amount: Decimal): Promise<void>
}
