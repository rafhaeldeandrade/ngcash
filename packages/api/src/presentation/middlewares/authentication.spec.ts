import { faker } from '@faker-js/faker'
import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { AuthenticationMiddleware } from '@/presentation/middlewares/authentication'
import { SchemaValidateStub } from '@/utils/test-stubs'

interface SutTypes {
  sut: AuthenticationMiddleware
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new AuthenticationMiddleware(schemaValidateStub)
  return { sut, schemaValidateStub }
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
})
