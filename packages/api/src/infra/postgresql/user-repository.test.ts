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
