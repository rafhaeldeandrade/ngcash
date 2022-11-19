import { LoadUser, LoadUserInput } from '@/domain/usecases/load-user'
import { LoadUserUseCase } from '@/application/usecases/load-user'
import { UserRepositoryStub, fakeUser } from '@/utils/test-stubs'
import { UserRepository } from '@/domain/repositories/user-repository'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: LoadUser
  userRepositoryStub: UserRepository
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new LoadUserUseCase(userRepositoryStub)
  return { sut, userRepositoryStub }
}

function makeFakeInput(): LoadUserInput {
  return faker.datatype.uuid()
}

describe('LoadUserUseCase', () => {
  it('should call userRepository.findUserByAccessToken', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByTokenSpy = jest.spyOn(
      userRepositoryStub,
      'findUserByAccessToken'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByTokenSpy).toHaveBeenCalledTimes(1)
    expect(findUserByTokenSpy).toHaveBeenCalledWith(input)
  })
})
