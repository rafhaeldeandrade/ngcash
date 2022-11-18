import { faker } from '@faker-js/faker'

import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { LoadUserAccountBalanceController } from '@/presentation/controllers/load-user-account-balance'
import { SchemaValidateStub } from '@/utils/test-stubs'

interface SutTypes {
  sut: LoadUserAccountBalanceController
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new LoadUserAccountBalanceController(schemaValidateStub)
  return {
    sut,
    schemaValidateStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    user: {
      id: faker.datatype.uuid(),
      accountId: faker.datatype.uuid()
    }
  }
}

describe('LoadUserAccountBalanceController', () => {
  it('should call schemaValidate.validate with correct params', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.user)
  })
})
