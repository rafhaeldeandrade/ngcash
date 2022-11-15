import { User } from '@/domain/entitities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { SignUpUser, SignUpUserInput } from '@/domain/usecases/sign-up-user'
import { faker } from '@faker-js/faker'
import { UserAlreadyExistsError } from '@/application/errors'
import { SignUpUserUseCase } from '@/application/usecases/sign-up-user'
import { Hasher } from '@/application/contracts'
import {
  SaveNewUserInput,
  SaveNewUserOutput
} from '@/domain/repositories/user-repository'

function makeFakeUser(): User {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    accountId: faker.datatype.uuid()
  }
}

class UserRepositoryStub implements UserRepository {
  async getUserByUsername(username: string): Promise<User | null> {
    return null
  }

  async saveNewUser(input: SaveNewUserInput): Promise<SaveNewUserOutput> {
    return makeFakeUser()
  }
}

const hashedPassword = `${faker.internet.password()}-hashed`
class HasherAdapterStub implements Hasher {
  async hash(value: string): Promise<string> {
    return hashedPassword
  }
}

interface SutTypes {
  sut: SignUpUser
  userRepositoryStub: UserRepository
  hasherAdapterStub: Hasher
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const hasherAdapterStub = new HasherAdapterStub()
  const sut = new SignUpUserUseCase(userRepositoryStub, hasherAdapterStub)
  return {
    sut,
    userRepositoryStub,
    hasherAdapterStub
  }
}

function makeFakeInput(): SignUpUserInput {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
}

describe('SignUpUserUseCase', () => {
  it('should call UserRepository.getUserByUsername with the correct value', async () => {
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

  it('should throw UserAlreadyExistsError if UserRepository.getUserByUsername returns an user', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'getUserByUsername')
      .mockResolvedValueOnce(makeFakeUser())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow(
      new UserAlreadyExistsError(input.username)
    )
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

  it('should call hasher.hash with the correct value', async () => {
    const { sut, hasherAdapterStub } = makeSut()
    const hashSpy = jest.spyOn(hasherAdapterStub, 'hash')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(hashSpy).toHaveBeenCalledTimes(1)
    expect(hashSpy).toHaveBeenCalledWith(input.password)
  })

  it('should throw if hasher.hash throws', async () => {
    const { sut, hasherAdapterStub } = makeSut()
    jest.spyOn(hasherAdapterStub, 'hash').mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })

  it('should call userRepository.saveNewUser with the correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const saveNewUserSpy = jest.spyOn(userRepositoryStub, 'saveNewUser')
    const input = makeFakeInput()
    await sut.execute(input)
    expect(saveNewUserSpy).toHaveBeenCalledTimes(1)
    expect(saveNewUserSpy).toHaveBeenCalledWith({
      username: input.username,
      password: hashedPassword
    })
  })

  it('should throw if userRepository.saveNewUser throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest
      .spyOn(userRepositoryStub, 'saveNewUser')
      .mockRejectedValueOnce(new Error())
    const input = makeFakeInput()
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrow()
  })
})
