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
import { HashComparer } from '@/application/contracts'

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

interface SutTypes {
  sut: Authentication
  userRepositoryStub: UserRepository
  hasherAdapterStub: HashComparer
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const hasherAdapterStub = new HasherAdapterStub()
  const sut = new AuthenticationUseCase(userRepositoryStub, hasherAdapterStub)
  return {
    sut,
    userRepositoryStub,
    hasherAdapterStub
  }
}

function makeFakeInput(): AuthenticationInput {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}

describe('AuthenticationUseCase', () => {
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
})
