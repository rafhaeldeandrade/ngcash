import { faker } from '@faker-js/faker'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput
} from '@/domain/usecases/load-user-account-balance'
import { LoadUserAccountBalanceUseCase } from '@/application/usecases/load-user-account-balance'
import { AccountRepository } from '@/domain/repositories/account-repository'
import { Account } from '@/domain/entitities/account'

class AccountRepositoryStub implements AccountRepository {
  async getAccountById(accountId: number): Promise<Account | null> {
    return {
      id: faker.datatype.number(),
      balance: faker.datatype.number()
    }
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
  it('should call accountRepository.getAccountById with the correct value', async () => {
    const { sut, accountRepositoryStub } = makeSut()
    const getAccountByIdSpy = jest.spyOn(
      accountRepositoryStub,
      'getAccountById'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(getAccountByIdSpy).toHaveBeenCalledTimes(1)
    expect(getAccountByIdSpy).toHaveBeenCalledWith(input)
  })
})
