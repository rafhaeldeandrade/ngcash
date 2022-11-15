import { faker } from '@faker-js/faker'
import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { SignUpUserController } from '@/presentation/controllers/sign-up-user'

class SchemaValidateStub implements SchemaValidate {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

interface SutTypes {
  sut: SignUpUserController
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new SignUpUserController(schemaValidateStub)
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

describe('SignUpUser Controller', () => {
  it('should call schemaValidate.validate with the correct values', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
