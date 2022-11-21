import { Transaction } from '@/domain/entitities/transaction'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { Decimal } from '@prisma/client/runtime'
import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'

export class PostgreSQLTransactionRepository implements TransactionRepository {
  save(fromId: number, toId: number, amount: Decimal): any {
    return prisma.transaction.create({
      data: {
        debitedAccountId: fromId,
        creditedAccountId: toId,
        amount
      }
    })
  }
}
