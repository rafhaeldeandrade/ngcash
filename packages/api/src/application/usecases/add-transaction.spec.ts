import { faker } from '@faker-js/faker'
import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput
} from '@/domain/usecases/add-transaction'
import { UserRepositoryStub } from '@/utils/test-stubs'
import { AddTransactionUseCase } from '@/application/usecases/add-transaction'
import { Prisma } from '@prisma/client'

interface SutTypes {
  sut: AddTransaction
  userRepositoryStub: UserRepository
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new AddTransactionUseCase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
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
  it('should call userRepository.findUserById with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByIdSpy = jest.spyOn(userRepositoryStub, 'findUserById')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByIdSpy).toHaveBeenCalledTimes(1)
    expect(findUserByIdSpy).toHaveBeenCalledWith(input.authAccountId)
  })
})
