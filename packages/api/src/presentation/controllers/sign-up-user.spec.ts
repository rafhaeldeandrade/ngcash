import { faker } from '@faker-js/faker'
import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { SignUpUserController } from '@/presentation/controllers/sign-up-user'
import {
  SignUpUser,
  SignUpUserInput,
  SignUpUserOutput
} from '@/domain/usecases/sign-up-user'
import { UserAlreadyExistsError } from '@/application/errors'

class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}

class SignUpUserUseCaseStub implements SignUpUser {
  async execute(input: SignUpUserInput): Promise<SignUpUserOutput> {
    return {
      id: faker.datatype.number()
    }
  }
}

interface SutTypes {
  sut: SignUpUserController
  schemaValidateStub: SchemaValidate
  signUpUserUseCaseStub: SignUpUser
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const signUpUserUseCaseStub = new SignUpUserUseCaseStub()
  const sut = new SignUpUserController(
    schemaValidateStub,
    signUpUserUseCaseStub
  )
  return {
    sut,
    schemaValidateStub,
    signUpUserUseCaseStub
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

describe('SignUpUser Controller', () => {
  it('should call schemaValidate.validate with the correct values', async () => {
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

  it('should call signUpUserUseCase.execute with the correct values', async () => {
    const { sut, signUpUserUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(signUpUserUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      username: httpRequest.body.username,
      password: httpRequest.body.password
    })
  })

  it('should return 409 if signUpUserUseCase.execute throws UserAlreadyExistsError', async () => {
    const { sut, signUpUserUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(signUpUserUseCaseStub, 'execute')
      .mockRejectedValueOnce(
        new UserAlreadyExistsError(httpRequest.body.username)
      )
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 409,
      body: {
        message: `User with username ${httpRequest.body.username} already exists`
      }
    })
  })

  it('should return 201 with the correct values on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 201,
      body: {
        id: expect.any(Number)
      }
    })
  })
})
