import { faker } from '@faker-js/faker'
import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput
} from '@/domain/usecases/add-transaction'
import { UserRepositoryStub, fakeUser } from '@/utils/test-stubs'
import { AddTransactionUseCase } from '@/application/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import {
  BalanceIsNotEnoughError,
  UserNotAuthorizedError,
  UserNotFoundError
} from '../errors'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'

export class TransactionRepositoryStub implements TransactionRepository {
  async saveTransaction(fromId: number, toId: number, amount: Prisma.Decimal) {
    return Promise.resolve()
  }
}

interface SutTypes {
  sut: AddTransaction
  userRepositoryStub: UserRepository
  transactionRepositoryStub: TransactionRepository
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const transactionRepositoryStub = new TransactionRepositoryStub()
  const sut = new AddTransactionUseCase(
    userRepositoryStub,
    transactionRepositoryStub
  )
  return {
    sut,
    userRepositoryStub,
    transactionRepositoryStub
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

  it('it should call transactionRepositoy.saveTransaction with the correct values', async () => {
    const { sut, userRepositoryStub, transactionRepositoryStub } = makeSut()
    const userToCashOutId = faker.datatype.number()
    const userToCashInId = faker.datatype.number()
    jest.spyOn(userRepositoryStub, 'findUserById').mockResolvedValueOnce({
      ...fakeUser,
      account: {
        ...fakeUser.account,
        id: userToCashOutId
      }
    })
    jest.spyOn(userRepositoryStub, 'findUserByUsername').mockResolvedValueOnce({
      ...fakeUser,
      account: {
        ...fakeUser.account,
        id: userToCashInId
      }
    })
    const saveTransactionSpy = jest.spyOn(
      transactionRepositoryStub,
      'saveTransaction'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(saveTransactionSpy).toHaveBeenCalledTimes(1)
    expect(saveTransactionSpy).toHaveBeenCalledWith(
      userToCashOutId,
      userToCashInId,
      input.amount
    )
  })
})
