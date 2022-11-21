import { Decimal } from '@prisma/client/runtime'
import { Transaction } from '@/domain/entitities/transaction'

export type TransactionRepositoryFindAllInput = {
  createdAt?: Date
  debitedAccountId?: number
  creditedAccountId?: number
  skip?: number
  take?: number
}
export interface TransactionRepository {
  save(fromId: number, toId: number, amount: Decimal): Promise<Transaction>
  findAll(input: TransactionRepositoryFindAllInput): Promise<Transaction[]>
}
