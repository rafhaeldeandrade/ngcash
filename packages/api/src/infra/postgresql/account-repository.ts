import {
  AccountRepository,
  GetBalanceOutput
} from '@/domain/repositories/account-repository'
import prismaHelper from '@/infra/postgresql/helpers/prisma-helper'

export class PostgreSQLAccountRepository implements AccountRepository {
  async getBalance(accountId: number): Promise<GetBalanceOutput | null> {
    return await prismaHelper.prisma.account.findUnique({
      where: {
        id: accountId
      },
      select: {
        balance: true
      }
    })
  }
}
