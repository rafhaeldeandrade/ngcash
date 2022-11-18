import { faker } from '@faker-js/faker'
import { User } from '@/domain/entitities/user'
import {
  SaveNewUserInput,
  SaveNewUserOutput,
  UserRepository
} from '@/domain/repositories/user-repository'
import {
  Authentication,
  AuthenticationInput
} from '@/domain/usecases/authentication'
import { AuthenticationUseCase } from '@/application/usecases/authentication'
import { WrongCredentialsError } from '../errors'
import { Decrypter, Encrypter, HashComparer } from '@/application/contracts'

function makeFakeUser(): User {
  return {
    id: faker.datatype.number(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    accountId: faker.datatype.number(),
    accessToken: null
  }
}

const fakeUser = makeFakeUser()
class UserRepositoryStub implements UserRepository {
  async getUserByUsername(username: string): Promise<User | null> {
    return fakeUser
  }

  async saveNewUser(input: SaveNewUserInput): Promise<SaveNewUserOutput> {
    return fakeUser
  }

  async updateAccessToken(
    userId: number,
    accessToken: string
  ): Promise<User | null> {
    return fakeUser
  }
}

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
  sut: Authentication
  userRepositoryStub: UserRepository
  hasherAdapterStub: HashComparer
  encrypterAdapterStub: Encrypter
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const hasherAdapterStub = new HasherAdapterStub()
  const encrypterAdapterStub = new EncrypterAdapterStub()
  const sut = new AuthenticationUseCase(
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

function makeFakeInput(): AuthenticationInput {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}

describe('AuthenticationUseCase', () => {
  afterEach(() => jest.restoreAllMocks())

  it('should call userRepository.getUserByUsername with the correct value', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const getUserByUsernameSpy = jest.spyOn(
      userRepositoryStub,
      'getUserByUsername'
    )
    const input = makeFakeInput()
    await sut.execute(input)
    expect(getUserByUsernameSpy).toHaveBeenCalledTimes(1)
    expect(getUserByUsernameSpy).toHaveBeenCalledWith(input.username)
  })

  it('should throw WrongCredentials if UserRepository.getUserByUsername returns null', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'getUserByUsername')
      .mockResolvedValueOnce(null)
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(new WrongCredentialsError())
  })

  it('should throw if userRepository.getUserByUsername throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'getUserByUsername')
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
