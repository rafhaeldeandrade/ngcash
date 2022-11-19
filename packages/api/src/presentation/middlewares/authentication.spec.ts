import { faker } from '@faker-js/faker'
import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { SchemaValidateStub } from '@/utils/test-stubs'
import {
  LoadUser,
  LoadUserInput,
  LoadUserOutput
} from '@/domain/usecases/load-user'
import { UserNotFoundError } from '@/application/errors'

const fakeUser = {
  id: faker.datatype.number(),
  username: faker.internet.userName(),
  accountId: faker.datatype.number()
}
class LoadUserUseCaseStub implements LoadUser {
  async execute(input: LoadUserInput): Promise<LoadUserOutput> {
    return fakeUser
  }
}

interface SutTypes {
  sut: AuthenticationMiddleware
  schemaValidateStub: SchemaValidate
  loadUserUseCaseStub: LoadUser
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const loadUserUseCaseStub = new LoadUserUseCaseStub()
  const sut = new AuthenticationMiddleware(
    schemaValidateStub,
    loadUserUseCaseStub
  )
  return { sut, schemaValidateStub, loadUserUseCaseStub }
}

function makeFakeRequest(): HttpRequest {
  return {
    headers: {
      authorization: faker.datatype.uuid()
    }
  }
}

describe('AuthenticationMiddleware', () => {
  it('should call schemaValidate.validate with the correct value', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.headers.authorization)
  })

  it('should return 400 if schemaValidate.validate returns an error', async () => {
    const error = new Error(faker.git.commitMessage())
    const { sut, schemaValidateStub } = makeSut()
    jest.spyOn(schemaValidateStub, 'validate').mockResolvedValueOnce(error)
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: {
        message: error.message
      }
    })
  })

  it('should return 500 if schemaValidate.validate throws an error', async () => {
    const { sut, schemaValidateStub } = makeSut()
    jest
      .spyOn(schemaValidateStub, 'validate')
      .mockRejectedValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: {
        message: 'Internal server error'
      }
    })
  })

  it('should call loadUserUseCase.execute with the correct values', async () => {
    const { sut, loadUserUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(loadUserUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.headers.authorization)
  })

  it('should return 404 if loadUserUseCase.execute throws UserNotFoundError', async () => {
    const { sut, loadUserUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(loadUserUseCaseStub, 'execute')
      .mockRejectedValueOnce(new UserNotFoundError())
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 404,
      body: {
        message: 'User not found'
      }
    })
  })

  it('should return 500 if loadUserUseCase.execute throws any error but UserNotFoundError', async () => {
    const { sut, loadUserUseCaseStub } = makeSut()
    jest
      .spyOn(loadUserUseCaseStub, 'execute')
      .mockRejectedValueOnce(new Error())
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: {
        message: 'Internal server error'
      }
    })
  })

  it('should return 200 with the correct values on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        user: {
          id: fakeUser.id,
          username: fakeUser.username,
          accountId: fakeUser.accountId
        }
      }
    })
  })
})
