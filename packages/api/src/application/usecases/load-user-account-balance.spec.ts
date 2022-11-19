import { faker } from '@faker-js/faker'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput
} from '@/domain/usecases/load-user-account-balance'
import { LoadUserAccountBalanceUseCase } from '@/application/usecases/load-user-account-balance'
import { AccountRepository } from '@/domain/repositories/account-repository'
import { AccountNotFoundError } from '@/application/errors'

class AccountRepositoryStub implements AccountRepository {
  async getBalance(accountId: number): Promise<number | null> {
    return faker.datatype.number()
  }
}

interface SutTypes {
  sut: LoadUserAccountBalance
  accountRepositoryStub: AccountRepository
}

function makeSut(): SutTypes {
  const accountRepositoryStub = new AccountRepositoryStub()
  const sut = new LoadUserAccountBalanceUseCase(accountRepositoryStub)
  return {
    sut,
    accountRepositoryStub
  }
}

function makeFakeInput(): LoadUserAccountBalanceInput {
  return faker.datatype.number()
}

describe('LoadUserAccountBalanceUseCase', () => {
  it('should call accountRepository.getBalance with the correct value', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const getAccountByIdSpy = jest.spyOn(accountRepositoryStub, 'getBalance')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(getAccountByIdSpy).toHaveBeenCalledTimes(1)
    expect(getAccountByIdSpy).toHaveBeenCalledWith(input)
  })

  it('should throw AccountNotFoundError if accountRepository.getBalance returns null', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getBalance').mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new AccountNotFoundError(input))
  })

  it('should throw if accountRepository.getBalance throws', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest
      .spyOn(accountRepositoryStub, 'getBalance')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })
})
