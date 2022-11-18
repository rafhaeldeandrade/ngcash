import { faker } from '@faker-js/faker'

import prismaHelper from '@/infra/postgresql/helpers/prisma-helper'
import PostgreSQLUserRepository from './user-repository'

describe('PostgreSQLUserRepository.getUserByUsername', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })

  afterAll(async () => {
    await prismaHelper.disconnect()
  })

  beforeEach(async () => {
    await prismaHelper.prisma.user.deleteMany()
  })

  it('should return User when a user was found by its username', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const account = await prismaHelper.prisma.account.create({
      data: {
        balance: 100
      }
    })
    const user = await prismaHelper.prisma.user.create({
      data: {
        username,
        password,
        accountId: account.id
      }
    })

    const sut = new PostgreSQLUserRepository()
    const result = await sut.getUserByUsername(username)

    expect(result).toEqual(user)
  })

  it('should return null when a user is not found', async () => {
    const username = faker.internet.userName()
    const sut = new PostgreSQLUserRepository()
    const result = await sut.getUserByUsername(username)

    expect(result).toBeNull()
  })
})

describe('PostgreSQLUserRepository.saveNewUser', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })

  afterAll(async () => {
    await prismaHelper.disconnect()
  })

  beforeEach(async () => {
    await prismaHelper.prisma.user.deleteMany()
    await prismaHelper.prisma.account.deleteMany()
  })

  it("should create an account and set its id to the user's accountId", async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()

    const sut = new PostgreSQLUserRepository()
    const user = await sut.saveNewUser({ username, password })
    const account = await prismaHelper.prisma.account.findUnique({
      where: {
        id: user.accountId
      }
    })

    expect(account).not.toBeNull()
  })
})

describe('PostgreSQLUserRepository.updateAccessToken', () => {
  beforeAll(async () => {
    await prismaHelper.connect()
  })

  afterAll(async () => {
    await prismaHelper.disconnect()
  })

  beforeEach(async () => {
    await prismaHelper.prisma.user.deleteMany()
  })

  it('should update the user with the given accessToken', async () => {
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const account = await prismaHelper.prisma.account.create({
      data: {
        balance: 100
      }
    })
    const user = await prismaHelper.prisma.user.create({
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
