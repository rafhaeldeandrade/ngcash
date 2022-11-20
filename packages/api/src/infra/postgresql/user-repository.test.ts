import { faker } from '@faker-js/faker'

import { prisma } from '@/infra/postgresql/adapters/prisma-adapter'
import PostgreSQLUserRepository from './user-repository'
import { Prisma } from '@prisma/client'

describe('PostgreSQLUserRepository.findUserByUsername', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should return User when a user was found by its username', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const account = await prisma.account.create({
      data: {
        balance: new Prisma.Decimal(100)
      }
    })
    const user = await prisma.user.create({
      data: {
        username,
        password,
        accountId: account.id
      }
    })

    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserByUsername(username)

    expect(result).toEqual({
      ...user,
      account: {
        id: account.id,
        balance: account.balance
      }
    })
  })

  it('should return null when a user is not found', async () => {
    const username = faker.internet.userName()
    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserByUsername(username)

    expect(result).toBeNull()
  })
})

describe('PostgreSQLUserRepository.saveNewUser', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
  })

  it("should create an account and set its id to the user's accountId", async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    const sut = new PostgreSQLUserRepository()
    const user = await sut.saveNewUser({ username, password })
    const account = await prisma.account.findUnique({
      where: {
        id: user.accountId
      }
    })

    expect(account).not.toBeNull()
  })
})

describe('PostgreSQLUserRepository.updateAccessToken', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should update the user with the given accessToken', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const account = await prisma.account.create({
      data: {
        balance: 100
      }
    })
    const user = await prisma.user.create({
      data: {
        username,
        password,
        accountId: account.id
      }
    })

    const sut = new PostgreSQLUserRepository()
    const accessToken = faker.datatype.uuid()
    const result = await sut.updateAccessToken(user.id, accessToken)

    expect(result?.accessToken).toBe(accessToken)
  })
})

describe('PostgreSQLUserRepository.findUserByAccessToken', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should return user if it is found', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const accessToken = faker.datatype.uuid()
    const account = await prisma.account.create({
      data: {
        balance: 100
      }
    })
    const user = await prisma.user.create({
      data: {
        username,
        password,
        accountId: account.id,
        accessToken
      }
    })

    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserByAccessToken(accessToken)

    expect(result).toEqual({
      ...user,
      account: {
        id: account.id,
        balance: account.balance
      }
    })
  })

  it('should return null when user is not found', async () => {
    const accessToken = faker.datatype.uuid()

    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserByAccessToken(accessToken)

    expect(result).toBeNull()
  })
})

describe('PostgreSQLUserRepository.findUserById', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should return user if it is found', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const accessToken = faker.datatype.uuid()
    const account = await prisma.account.create({
      data: {
        balance: 100
      }
    })
    const user = await prisma.user.create({
      data: {
        username,
        password,
        accountId: account.id,
        accessToken
      }
    })

    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserById(user.id)

    expect(result).toEqual({
      ...user,
      account: {
        id: account.id,
        balance: account.balance
      }
    })
  })

  it('should return null when user is not found', async () => {
    const fakeId = faker.datatype.number()

    const sut = new PostgreSQLUserRepository()
    const result = await sut.findUserById(fakeId)

    expect(result).toBeNull()
  })
})
