import { Decimal } from '@prisma/client/runtime'
import { Transaction } from '@/domain/entitities/transaction'

export interface TransactionRepository {
  save(fromId: number, toId: number, amount: Decimal): Promise<Transaction>
}
