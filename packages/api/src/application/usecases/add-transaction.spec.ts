import { faker } from '@faker-js/faker'
import { UserRepository } from '@/domain/repositories/user-repository'
import {
  AddTransaction,
  AddTransactionInput
} from '@/domain/usecases/add-transaction'
import { UserRepositoryStub, fakeUser } from '@/utils/test-stubs'
import { AddTransactionUseCase } from '@/application/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import { UserNotAuthorizedError } from '../errors'

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

  it('should call userRepository.findUserById with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByIdSpy = jest.spyOn(userRepositoryStub, 'findUserById')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByIdSpy).toHaveBeenCalledTimes(1)
    expect(findUserByIdSpy).toHaveBeenCalledWith(input.authAccountId)
  })

  it('should throw UserNotAuthorizedError if username returned from userRepository.findUserById is the same as the usernameToCashIn', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    input.usernameToCashIn = fakeUser.username
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotAuthorizedError())
  })
})