import { faker } from '@faker-js/faker'

import { SchemaValidateStub } from '@/utils/test-stubs'
import { HttpRequest, SchemaValidate } from '../contracts'
import { LoadTransactionsController } from './load-transactions'

interface SutTypes {
  sut: LoadTransactionsController
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new LoadTransactionsController(schemaValidateStub)
  return {
    sut,
    schemaValidateStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    query: {
      page: faker.datatype.number(),
      transactionType: faker.helpers.arrayElement(['cashIn', 'cashOut']),
      date: faker.date.past()
    }
  }
}

describe('LoadTransactionsController', () => {
  it('should call schemaValidate.validate with correct values', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(request.query)
  })
})
