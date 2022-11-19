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
})
