import { faker } from '@faker-js/faker'

import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { AuthenticationController } from '@/presentation/controllers/authentication'
import {
  Authentication,
  AuthenticationInput,
  AuthenticationOutput
} from '@/domain/usecases/authentication'
import { WrongCredentialsError } from '@/application/errors'

class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}

class AuthenticationUseCaseStub implements Authentication {
  async execute(input: AuthenticationInput): Promise<AuthenticationOutput> {
    return {
      accessToken: faker.datatype.uuid()
    }
  }
}

interface SutTypes {
  sut: AuthenticationController
  schemaValidateStub: SchemaValidate
  authenticationUseCaseStub: Authentication
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const authenticationUseCaseStub = new AuthenticationUseCaseStub()
  const sut = new AuthenticationController(
    schemaValidateStub,
    authenticationUseCaseStub
  )
  return {
    sut,
    schemaValidateStub,
    authenticationUseCaseStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      username: faker.internet.userName(),
      password: faker.internet.password()
    }
  }
}

describe('AuthenticateController', () => {
  it('should call schemaValidate.validate with correct params', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
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

  it('should call authenticationUseCase.execute with the correct values', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(authenticationUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      username: httpRequest.body.username,
      password: httpRequest.body.password
    })
  })

  it('should return 401 if authenticationUseCase.execute throws WrongCredentialsError', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(authenticationUseCaseStub, 'execute')
      .mockRejectedValueOnce(new WrongCredentialsError())
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 401,
      body: {
        message: 'Wrong credentials'
      }
    })
  })

  it('should return 500 if authenticationUseCase.execute throws any error but WrongCredentialsError', async () => {
    const { sut, authenticationUseCaseStub } = makeSut()
    jest
      .spyOn(authenticationUseCaseStub, 'execute')
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
        accessToken: expect.any(String)
      }
    })
  })
})
