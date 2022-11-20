import { faker } from '@faker-js/faker'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput
} from '@/domain/usecases/load-user-account-balance'
import { LoadUserAccountBalanceUseCase } from '@/application/usecases/load-user-account-balance'
import { AccountRepository } from '@/domain/repositories/account-repository'
import { UserNotAuthorizedError } from '@/application/errors'
import { AccountRepositoryStub, fakeAccount } from '@/utils/test-stubs'

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

const fakeId = faker.datatype.number()
function makeFakeInput(): LoadUserAccountBalanceInput {
  return {
    paramsAccountId: fakeId,
    authAccountId: fakeId
  }
}

describe('LoadUserAccountBalanceUseCase', () => {
  it('should throw UserNotAuthorizedError if authAccountId is not equal to queryAccountId', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    input.authAccountId = faker.datatype.number()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotAuthorizedError())
  })

  it('should call accountRepository.getBalance with the correct value', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const getAccountByIdSpy = jest.spyOn(accountRepositoryStub, 'getBalance')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(getAccountByIdSpy).toHaveBeenCalledTimes(1)
    expect(getAccountByIdSpy).toHaveBeenCalledWith(input.paramsAccountId)
  })

  it('should throw UserNotAuthorizedError if accountRepository.getBalance returns null', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'getBalance').mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotAuthorizedError())
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

  it('should return the correct values on success', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    const balance = await sut.execute(input)
    expect(balance).toEqual({
      balance: fakeAccount.balance.toNumber()
    })
  })
})
