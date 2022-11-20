import { Transaction } from '@/domain/entitities/transaction'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { Decimal } from '@prisma/client/runtime'
import { prisma } from './adapters/prisma-adapter'

export class PostgreSQLTransactionRepository implements TransactionRepository {
  async save(
    fromId: number,
    toId: number,
    amount: Decimal
  ): Promise<Transaction> {
    return prisma.transaction.create({
      data: {
        debitedAccountId: fromId,
        creditedAccountId: toId,
        amount
      }
    })
  }
}
