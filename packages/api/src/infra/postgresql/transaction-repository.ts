import { Transaction } from '@/domain/entitities/transaction'
import {
  TransactionRepository,
  TransactionRepositoryFindAllInput
} from '@/domain/repositories/transaction-repository'
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

  async findAll(
    input: TransactionRepositoryFindAllInput
  ): Promise<Transaction[]> {
    const filter: any = {}
    const { createdAt, debitedAccountId, creditedAccountId, skip, take } = input
    if (debitedAccountId) filter.debitedAccountId = debitedAccountId
    if (creditedAccountId) filter.creditedAccountId = creditedAccountId
    if (debitedAccountId && creditedAccountId) {
      delete filter.creditedAccountId
      delete filter.debitedAccountId
      filter.OR = [{ debitedAccountId }, { creditedAccountId }]
    }
    if (createdAt) filter.createdAt = createdAt
    return await prisma.transaction.findMany({
      where: filter,
      skip,
      take
    })
  }

  async count(input: TransactionRepositoryFindAllInput): Promise<number> {
    const filter: any = {}
    const { createdAt, debitedAccountId, creditedAccountId, skip, take } = input
    if (debitedAccountId) filter.debitedAccountId = debitedAccountId
    if (creditedAccountId) filter.creditedAccountId = creditedAccountId
    if (debitedAccountId && creditedAccountId) {
      delete filter.creditedAccountId
      delete filter.debitedAccountId
      filter.OR = [{ debitedAccountId }, { creditedAccountId }]
    }
    if (createdAt) filter.createdAt = createdAt
    return await prisma.transaction.count({
      where: filter,
      skip,
      take
    })
  }
}
