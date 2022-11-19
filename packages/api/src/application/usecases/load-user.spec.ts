import { LoadUser, LoadUserInput } from '@/domain/usecases/load-user'
import { LoadUserUseCase } from '@/application/usecases/load-user'
import { UserRepositoryStub, fakeUser } from '@/utils/test-stubs'
import { UserRepository } from '@/domain/repositories/user-repository'
import { faker } from '@faker-js/faker'
import { UserNotFoundError } from '../errors'

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

  it('should throw UserNotFoundError if userRepository.findUserByAccessToken returns null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'findUserByAccessToken')
      .mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  it('should throw if userRepository.findUserByAccessToken throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'findUserByAccessToken')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should return the correct values on success', async () => {
    const { sut } = makeSut()
    const input = makeFakeInput()
    const user = await sut.execute(input)
    expect(user).toEqual({
      id: fakeUser.id,
      username: fakeUser.username,
      accountId: fakeUser.accountId
    })
  })
})
