import { User } from '@/domain/entitities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { SignUpUser, SignUpUserInput } from '@/domain/usecases/sign-up-user'
import { faker } from '@faker-js/faker'
import { SignUpUserUseCase } from './sign-up-user'

function makeFakeUser(): User {
  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    accountId: faker.datatype.uuid()
  }
}

class UserRepositoryStub implements UserRepository {
  async getUserByUsername(username: string): Promise<User> {
    return makeFakeUser()
  }
}

interface SutTypes {
  sut: SignUpUser
  userRepositoryStub: UserRepository
}

function makeSut(): SutTypes {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new SignUpUserUseCase(userRepositoryStub)
  return {
    sut,
    userRepositoryStub
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
})
