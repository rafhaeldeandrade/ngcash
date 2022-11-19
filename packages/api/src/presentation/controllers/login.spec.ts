import { faker } from '@faker-js/faker'

import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { LoginController } from '@/presentation/controllers/login'
import { Login, LoginInput, LoginOutput } from '@/domain/usecases/login'
import { WrongCredentialsError } from '@/application/errors'

class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}

const fakeUseCaseOutput = {
  accessToken: faker.datatype.uuid(),
  userId: faker.datatype.number(),
  accountId: faker.datatype.number()
}
class LoginUseCaseStub implements Login {
  async execute(input: LoginInput): Promise<LoginOutput> {
    return fakeUseCaseOutput
  }
}

interface SutTypes {
  sut: LoginController
  schemaValidateStub: SchemaValidate
  loginUseCaseStub: Login
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const loginUseCaseStub = new LoginUseCaseStub()
  const sut = new LoginController(schemaValidateStub, loginUseCaseStub)
  return {
    sut,
    schemaValidateStub,
    loginUseCaseStub
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
    const { sut, loginUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(loginUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      username: httpRequest.body.username,
      password: httpRequest.body.password
    })
  })

  it('should return 401 if authenticationUseCase.execute throws WrongCredentialsError', async () => {
    const { sut, loginUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(loginUseCaseStub, 'execute')
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
    const { sut, loginUseCaseStub } = makeSut()
    jest.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(new Error())
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
      body: fakeUseCaseOutput
    })
  })
})
