import { faker } from '@faker-js/faker'
import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput
} from '@/domain/usecases/add-transaction'
import {
  UserRepositoryStub,
  fakeUser,
  AccountRepositoryStub,
  TransactionRepositoryStub
} from '@/utils/test-stubs'
import { AddTransactionUseCase } from '@/application/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import {
  BalanceIsNotEnoughError,
  UserNotAuthorizedError,
  UserNotFoundError
} from '../errors'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { DbAdapter } from '@/application/contracts'
import { AccountRepository } from '@/domain/repositories/account-repository'

function dbAdapter(): DbAdapter {
  return {
    initiateDbTransaction: async (queries: any[]) => {
      return []
    }
  }
}

interface SutTypes {
  sut: AddTransaction
  userRepositoryStub: UserRepository
  transactionRepositoryStub: TransactionRepository
  accountRepositoryStub: AccountRepository
  dbAdapterStub: DbAdapter
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const transactionRepositoryStub = new TransactionRepositoryStub()
  const accountRepositoryStub = new AccountRepositoryStub()
  const dbAdapterStub = dbAdapter()
  const sut = new AddTransactionUseCase(
    userRepositoryStub,
    accountRepositoryStub,
    transactionRepositoryStub,
    dbAdapterStub
  )
  return {
    sut,
    userRepositoryStub,
    transactionRepositoryStub,
    accountRepositoryStub,
    dbAdapterStub
  }
}

function makeFakeInput(): AddTransactionInput {
  return {
    usernameToCashIn: faker.internet.userName(),
    authAccountId: faker.datatype.number(),
    amount: new Prisma.Decimal(faker.datatype.number())
  }
}

describe('AddTransactionUseCase', () => {
  it('should call userRepository.findUserByUsername with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByUsernameSpy = jest.spyOn(
      userRepositoryStub,
      'findUserByUsername'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByUsernameSpy).toHaveBeenCalledTimes(1)
    expect(findUserByUsernameSpy).toHaveBeenCalledWith(input.usernameToCashIn)
  })

  it('should throw UserNotFoundError if user was not found by userRepository.findUserByUsername', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'findUserByUsername')
      .mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  it('should call userRepository.findUserById with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByIdSpy = jest.spyOn(userRepositoryStub, 'findUserById')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByIdSpy).toHaveBeenCalledTimes(1)
    expect(findUserByIdSpy).toHaveBeenCalledWith(input.authAccountId)
  })

  it('should throw UserNotFoundError if user was not found by userRepository.findUserById', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findUserById').mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  it('should throw UserNotAuthorizedError if username returned from userRepository.findUserById is the same as the usernameToCashIn', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    input.usernameToCashIn = fakeUser.username
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotAuthorizedError())
  })

  it('should throw BalanceIsNotEnoughError if balance is not enough', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'findUserById').mockResolvedValueOnce({
      ...fakeUser,
      account: {
        ...fakeUser.account,
        balance: new Prisma.Decimal(0)
      }
    })
    const input = makeFakeInput()
    input.amount = new Prisma.Decimal(1)
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new BalanceIsNotEnoughError())
  })

  it('should call dbAdapter.initiateDbTransaction with the correct values', async () => {
    const {
      sut,
      dbAdapterStub,
      accountRepositoryStub,
      transactionRepositoryStub
    } = makeSut()
    const initiateDbTransactionSpy = jest.spyOn(
      dbAdapterStub,
      'initiateDbTransaction'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(initiateDbTransactionSpy).toHaveBeenCalledTimes(1)
    expect(initiateDbTransactionSpy).toHaveBeenCalledWith([
      accountRepositoryStub.decrementBalance(input.authAccountId, input.amount),
      accountRepositoryStub.incrementBalance(fakeUser.id, input.amount),
      transactionRepositoryStub.save(
        input.authAccountId,
        fakeUser.id,
        input.amount
      )
    ])
  })

  it('should return the correct values on success', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    const result = await sut.execute(input)
    expect(result).toEqual({
      amountTransacted: input.amount,
      from: fakeUser.username,
      to: fakeUser.username
    })
  })
})
