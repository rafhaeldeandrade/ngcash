import { Account } from '@/domain/entitities/account'
import {
  AccountRepository,
  GetBalanceOutput
} from '@/domain/repositories/account-repository'
import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'
import { Decimal } from '@prisma/client/runtime'

export class PostgreSQLAccountRepository implements AccountRepository {
  async getBalance(accountId: number): Promise<GetBalanceOutput | null> {
    return prisma.account.findUnique({
      where: {
        id: accountId
      },
      select: {
        balance: true
      }
    })
  }

  async incrementBalance(accountId: number, amount: Decimal): Promise<Account> {
    return prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: {
          increment: amount
        }
      }
    })
  }

  async decrementBalance(accountId: number, amount: Decimal): Promise<Account> {
    return prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    })
  }
}
