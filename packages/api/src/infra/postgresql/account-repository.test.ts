import { faker } from '@faker-js/faker'
import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'
import { PostgreSQLAccountRepository } from '@/infra/postgresql/account-repository'
import { Prisma } from '@prisma/client'

describe('PostgreSQLAccountRepository.getBalance', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
    await prisma.account.deleteMany()
  })

  it('should return the correct balance when account is found', async () => {
    const balance = new Prisma.Decimal(faker.datatype.number())
    const account = await prisma.account.create({
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

  it('should return null when account is not found', async () => {
    const fakeId = faker.datatype.number()
    const sut = new PostgreSQLAccountRepository()
    const result = await sut.getBalance(fakeId)

    expect(result).toBeNull()
  })
})

describe('PostgreSQLAccountRepository.incrementBalance', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
    await prisma.account.deleteMany()
  })

  it('should return the correct account with updated balance when it works', async () => {
    const currentBalance = new Prisma.Decimal(faker.datatype.number())
    const balanceToIncrement = new Prisma.Decimal(faker.datatype.number())
    const account = await prisma.account.create({
      data: {
        balance: currentBalance
      }
    })
    const sut = new PostgreSQLAccountRepository()
    const result = await sut.incrementBalance(account.id, balanceToIncrement)

    expect(result).toEqual(
      expect.objectContaining({
        ...account,
        updatedAt: expect.any(Date),
        balance: currentBalance.add(balanceToIncrement)
      })
    )
  })

  it('should throw when account is not found', async () => {
    const fakeId = faker.datatype.number()
    const sut = new PostgreSQLAccountRepository()
    const promise = sut.incrementBalance(fakeId, new Prisma.Decimal(0))

    await expect(promise).rejects.toThrow()
  })
})

describe('PostgreSQLAccountRepository.decrementBalance', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
    await prisma.account.deleteMany()
  })

  it('should return the correct account with updated balance when it works', async () => {
    const currentBalance = new Prisma.Decimal(
      faker.datatype.number({
        min: 1000
      })
    )
    const balanceToDecrement = new Prisma.Decimal(
      faker.datatype.number({
        max: 999
      })
    )
    const account = await prisma.account.create({
      data: {
        balance: currentBalance
      }
    })
    const sut = new PostgreSQLAccountRepository()
    const result = await sut.decrementBalance(account.id, balanceToDecrement)

    expect(result).toEqual(
      expect.objectContaining({
        ...account,
        updatedAt: expect.any(Date),
        balance: currentBalance.sub(balanceToDecrement)
      })
    )
  })

  it('should throw when account is not found', async () => {
    const fakeId = faker.datatype.number()
    const sut = new PostgreSQLAccountRepository()
    const promise = sut.decrementBalance(fakeId, new Prisma.Decimal(0))

    await expect(promise).rejects.toThrow()
  })
})
