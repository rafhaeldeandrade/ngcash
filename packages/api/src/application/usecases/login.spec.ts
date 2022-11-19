import { faker } from '@faker-js/faker'
import { User } from '@/domain/entitities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { Login, LoginInput } from '@/domain/usecases/login'
import { LoginUseCase } from '@/application/usecases/login'
import { WrongCredentialsError } from '@/application/errors'
import { Encrypter, HashComparer } from '@/application/contracts'
import { fakeUser, UserRepositoryStub } from '@/utils/test-stubs'

class HasherAdapterStub implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return true
  }
}

class EncrypterAdapterStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return faker.datatype.uuid()
  }
}

interface SutTypes {
  sut: Login
  userRepositoryStub: UserRepository
  hasherAdapterStub: HashComparer
  encrypterAdapterStub: Encrypter
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const hasherAdapterStub = new HasherAdapterStub()
  const encrypterAdapterStub = new EncrypterAdapterStub()
  const sut = new LoginUseCase(
    userRepositoryStub,
    hasherAdapterStub,
    encrypterAdapterStub
  )
  return {
    sut,
    userRepositoryStub,
    hasherAdapterStub,
    encrypterAdapterStub
  }
}

function makeFakeInput(): LoginInput {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}

describe('AuthenticationUseCase', () => {
  afterEach(() => jest.restoreAllMocks())

  it('should call userRepository.findUserByUsername with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const findUserByUsernameSpy = jest.spyOn(
      userRepositoryStub,
      'findUserByUsername'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(findUserByUsernameSpy).toHaveBeenCalledTimes(1)
    expect(findUserByUsernameSpy).toHaveBeenCalledWith(input.username)
  })

  it('should throw WrongCredentials if UserRepository.findUserByUsername returns null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'findUserByUsername')
      .mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new WrongCredentialsError())
  })

  it('should throw if userRepository.findUserByUsername throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'findUserByUsername')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should call hashComparer.compare with the correct values', async () => {
    const { sut, hasherAdapterStub } = makeSut()
    const compareSpy = jest.spyOn(hasherAdapterStub, 'compare')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(compareSpy).toHaveBeenCalledTimes(1)
    expect(compareSpy).toHaveBeenCalledWith(input.password, fakeUser.password)
  })

  it('should throw WrongCredentials if hashComparer.compare returns false', async () => {
    const { sut, hasherAdapterStub } = makeSut()
    jest.spyOn(hasherAdapterStub, 'compare').mockResolvedValueOnce(false)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new WrongCredentialsError())
  })

  it('should throw if hashComparer.compare throws', async () => {
    const { sut, hasherAdapterStub } = makeSut()
    jest.spyOn(hasherAdapterStub, 'compare').mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should call encrypter.encrypt with the correct value', async () => {
    const { sut, encrypterAdapterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterAdapterStub, 'encrypt')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith(fakeUser.id.toString())
  })

  it('should throw if encrypter.encrypt throws', async () => {
    const { sut, encrypterAdapterStub } = makeSut()
    jest
      .spyOn(encrypterAdapterStub, 'encrypt')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should call userRepository.updateAccessToken with the correct values', async () => {
    const { sut, encrypterAdapterStub, userRepositoryStub } = makeSut()
    const fakeToken = faker.datatype.uuid()
    jest.spyOn(encrypterAdapterStub, 'encrypt').mockResolvedValueOnce(fakeToken)
    const updateAccessTokenSpy = jest.spyOn(
      userRepositoryStub,
      'updateAccessToken'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(updateAccessTokenSpy).toHaveBeenCalledTimes(1)
    expect(updateAccessTokenSpy).toHaveBeenCalledWith(fakeUser.id, fakeToken)
  })

  it('should throw if userRepository.updateAccessToken throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'updateAccessToken')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should return the result of encrypter.encrypt', async () => {
    const { sut, encrypterAdapterStub } = makeSut()
    const fakeToken = faker.datatype.uuid()
    jest.spyOn(encrypterAdapterStub, 'encrypt').mockResolvedValueOnce(fakeToken)
    const input = makeFakeInput()
    const accessToken = await sut.execute(input)
    expect(accessToken).toEqual({
      accessToken: fakeToken
    })
  })
})
