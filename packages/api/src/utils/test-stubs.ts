import { faker } from '@faker-js/faker'
import { User } from '@/domain/entitities/user'
import {
  SaveNewUserInput,
  SaveNewUserOutput,
  UserRepository
} from '@/domain/repositories/user-repository'
import { SchemaValidate } from '@/presentation/contracts'
import { Prisma } from '@prisma/client'
import {
  AccountRepository,
  GetBalanceOutput
} from '@/domain/repositories/account-repository'
import { Account } from '@/domain/entitities/account'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { Transaction } from '@/domain/entitities/transaction'

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
      balance: new Prisma.Decimal(
        faker.datatype.number({
          min: 1000000000000
        })
      )
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

  async findUserById(userId: number): Promise<User | null> {
    return fakeUser
  }
}

function makeFakeAccount(): Account {
  return {
    id: faker.datatype.number(),
    balance: new Prisma.Decimal(faker.datatype.number())
  }
}

export const fakeAccount = makeFakeAccount()
export class AccountRepositoryStub implements AccountRepository {
  async getBalance(accountId: number): Promise<GetBalanceOutput | null> {
    return {
      balance: new Prisma.Decimal(fakeAccount.balance)
    }
  }

  async incrementBalance(
    accountId: number,
    amount: Prisma.Decimal
  ): Promise<Account> {
    return fakeAccount
  }

  async decrementBalance(
    accountId: number,
    amount: Prisma.Decimal
  ): Promise<Account> {
    return fakeAccount
  }
}

export const fakeTransaction = {
  id: faker.datatype.number(),
  debitedAccountId: faker.datatype.number(),
  debitedAccount: {
    id: faker.datatype.number(),
    user: {
      id: faker.datatype.number(),
      username: faker.internet.userName()
    }
  },
  creditedAccountId: faker.datatype.number(),
  creditedAccount: {
    id: faker.datatype.number(),
    user: {
      id: faker.datatype.number(),
      username: faker.internet.userName()
    }
  },
  amount: new Prisma.Decimal(faker.datatype.number())
}
export class TransactionRepositoryStub implements TransactionRepository {
  async save(
    fromId: number,
    toId: number,
    amount: Prisma.Decimal
  ): Promise<Transaction> {
    return fakeTransaction as Transaction
  }

  async findAll() {
    return [fakeTransaction]
  }

  async count() {
    return 1
  }
}
