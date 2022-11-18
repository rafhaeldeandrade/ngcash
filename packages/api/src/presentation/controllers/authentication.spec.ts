import { faker } from '@faker-js/faker'

import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { AuthenticationController } from '@/presentation/controllers/authentication'

class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | void> {
    return Promise.resolve()
  }
}

interface SutTypes {
  sut: AuthenticationController
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new AuthenticationController(schemaValidateStub)
  return {
    sut,
    schemaValidateStub
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
})
