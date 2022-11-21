import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'
import { PostgreSQLTransactionRepository } from '@/infra/postgresql/transaction-repository'

describe('PostgreSQLTransactionRepository.save', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.transaction.deleteMany()
    await prisma.account.deleteMany()
  })

  it('should save a transaction correctly', async () => {
    const account1 = await prisma.account.create({
      data: {
        balance: new Prisma.Decimal(100)
      }
    })
    const account2 = await prisma.account.create({
      data: {
        balance: new Prisma.Decimal(100)
      }
    })
    const sut = new PostgreSQLTransactionRepository()
    const result = await sut.save(
      account1.id,
      account2.id,
      new Prisma.Decimal(10)
    )

    expect(result).toEqual({
      id: expect.any(Number),
      debitedAccountId: account1.id,
      creditedAccountId: account2.id,
      amount: new Prisma.Decimal(10),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should throw when account is not found', async () => {
    const fakeId1 = faker.datatype.number()
    const fakeId2 = faker.datatype.number()
    const sut = new PostgreSQLTransactionRepository()
    const promise = sut.save(fakeId1, fakeId2, new Prisma.Decimal(10))

    await expect(promise).rejects.toThrow()
  })
})
