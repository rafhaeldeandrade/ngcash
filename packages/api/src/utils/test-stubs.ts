import { faker } from '@faker-js/faker'
import { User } from '@/domain/entitities/user'
import {
  SaveNewUserInput,
  SaveNewUserOutput,
  UserRepository
} from '@/domain/repositories/user-repository'
import { SchemaValidate } from '@/presentation/contracts'
import { Prisma } from '@prisma/client'

export class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}

export function makeFakeUser(): User {
  return {
    id: faker.datatype.number(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    accountId: faker.datatype.number(),
    accessToken: faker.datatype.uuid(),
    account: {
      id: faker.datatype.number(),
      balance: new Prisma.Decimal(faker.datatype.number())
    }
  }
}

export const fakeUser = makeFakeUser()
export class UserRepositoryStub implements UserRepository {
  async findUserByUsername(username: string): Promise<User | null> {
    return fakeUser
  }

  async saveNewUser(input: SaveNewUserInput): Promise<SaveNewUserOutput> {
    return fakeUser
  }

  async updateAccessToken(
    userId: number,
    accessToken: string
  ): Promise<User | null> {
    return fakeUser
  }

  async findUserByAccessToken(accessToken: string): Promise<User | null> {
    return fakeUser
  }
}
