import { faker } from '@faker-js/faker'
import prismaHelper from '@/infra/postgresql/helpers/prisma-helper'
import { PostgreSQLAccountRepository } from '@/infra/postgresql/account-repository'
import { Prisma } from '@prisma/client'

describe('PostgreSQLAccountRepository.getBalance', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })

  afterAll(async () => {
    await prismaHelper.disconnect()
  })

  beforeEach(async () => {
    await prismaHelper.prisma.account.deleteMany()
  })

  it('should return the correct balance when account was found', async () => {
    const balance = new Prisma.Decimal(faker.datatype.number())
    const account = await prismaHelper.prisma.account.create({
      data: {
        balance
      }
    })
    const sut = new PostgreSQLAccountRepository()
    const result = await sut.getBalance(account.id)

    expect(result).toEqual({
      balance: account.balance
    })
  })
})
