import { faker } from '@faker-js/faker'
import {
  LoadTransactions,
  LoadTransactionsInput
} from '@/domain/usecases/load-transactions'
import { LoadTransactionsUseCase } from '@/application/usecases/load-transactions'
import { TransactionRepository } from '@/domain/repositories/transaction-repository'
import { fakeTransaction, TransactionRepositoryStub } from '@/utils/test-stubs'

interface SutTypes {
  sut: LoadTransactions
  transactionRepositoryStub: TransactionRepository
}

function makeSut(): SutTypes {
  const transactionRepositoryStub = new TransactionRepositoryStub()
  const sut = new LoadTransactionsUseCase(transactionRepositoryStub)
  return {
    sut,
    transactionRepositoryStub
  }
}

function makeFakeInput(): LoadTransactionsInput {
  return {
    accountId: faker.datatype.number(),
    page: faker.datatype.number(),
    transactionType: faker.helpers.arrayElement(['cashIn', 'cashOut']),
    date: faker.date.past()
  }
}

describe('LoadTransactionsUseCase', () => {
  it('should call transactionRepository.findAll with the correct values when transactionType is all', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const findAllSpy = jest.spyOn(transactionRepositoryStub, 'findAll')
    const input = makeFakeInput()
    input.transactionType = 'all'
    await sut.execute(input)
    expect(findAllSpy).toHaveBeenCalledTimes(1)
    expect(findAllSpy).toHaveBeenCalledWith({
      debitedAccountId: input.accountId,
      creditedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should call transactionRepository.count with the correct values when transactionType is all', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const countSpy = jest.spyOn(transactionRepositoryStub, 'count')
    const input = makeFakeInput()
    input.transactionType = 'all'
    await sut.execute(input)
    expect(countSpy).toHaveBeenCalledTimes(1)
    expect(countSpy).toHaveBeenCalledWith({
      debitedAccountId: input.accountId,
      creditedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should call transactionRepository.findAll with the correct values when transactionType is cashIn', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const findAllSpy = jest.spyOn(transactionRepositoryStub, 'findAll')
    const input = makeFakeInput()
    input.transactionType = 'cashIn'
    await sut.execute(input)
    expect(findAllSpy).toHaveBeenCalledTimes(1)
    expect(findAllSpy).toHaveBeenCalledWith({
      creditedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should call transactionRepository.count with the correct values when transactionType is cashIn', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const countSpy = jest.spyOn(transactionRepositoryStub, 'count')
    const input = makeFakeInput()
    input.transactionType = 'cashIn'
    await sut.execute(input)
    expect(countSpy).toHaveBeenCalledTimes(1)
    expect(countSpy).toHaveBeenCalledWith({
      creditedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should call transactionRepository.findAll with the correct values when transactionType is cashOut', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const findAllSpy = jest.spyOn(transactionRepositoryStub, 'findAll')
    const input = makeFakeInput()
    input.transactionType = 'cashOut'
    await sut.execute(input)
    expect(findAllSpy).toHaveBeenCalledTimes(1)
    expect(findAllSpy).toHaveBeenCalledWith({
      debitedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should call transactionRepository.count with the correct values when transactionType is cashOut', async () => {
    const { sut, transactionRepositoryStub } = makeSut()
    const countSpy = jest.spyOn(transactionRepositoryStub, 'count')
    const input = makeFakeInput()
    input.transactionType = 'cashOut'
    await sut.execute(input)
    expect(countSpy).toHaveBeenCalledTimes(1)
    expect(countSpy).toHaveBeenCalledWith({
      debitedAccountId: input.accountId,
      skip: (input.page - 1) * 10,
      take: 10,
      startDate: expect.any(Date),
      endDate: expect.any(Date)
    })
  })

  it('should return the correct values on success', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    const result = await sut.execute(input)
    expect(result).toEqual({
      transactions: [fakeTransaction],
      totalTransactions: 1
    })
  })
})
