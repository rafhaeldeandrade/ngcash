import { faker } from '@faker-js/faker'

import { SchemaValidateStub } from '@/utils/test-stubs'
import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { LoadTransactionsController } from '@/presentation/controllers/load-transactions'
import {
  LoadTransactionsInput,
  LoadTransactionsOutput
} from '@/domain/usecases/load-transactions'
import { LoadTransactions } from '@/domain/usecases/load-transactions'

const fakeUseCaseOutput = {
  transactions: [],
  totalTransactions: faker.datatype.number()
}
class LoadTransactionsUseCaseStub implements LoadTransactions {
  async execute(input: LoadTransactionsInput): Promise<LoadTransactionsOutput> {
    return fakeUseCaseOutput
  }
}

interface SutTypes {
  sut: LoadTransactionsController
  schemaValidateStub: SchemaValidate
  loadTransactionsUseCaseStub: LoadTransactions
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const loadTransactionsUseCaseStub = new LoadTransactionsUseCaseStub()
  const sut = new LoadTransactionsController(
    schemaValidateStub,
    loadTransactionsUseCaseStub
  )
  return {
    sut,
    schemaValidateStub,
    loadTransactionsUseCaseStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    query: {
      page: faker.datatype.number(),
      transactionType: faker.helpers.arrayElement(['cashIn', 'cashOut']),
      date: faker.date.past()
    },
    body: {
      user: {
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      }
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

  it('should call loadTransactionsUseCase.execute with the correct values', async () => {
    const { sut, loadTransactionsUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(loadTransactionsUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      page: httpRequest.query.page,
      transactionType: httpRequest.query.transactionType,
      date: httpRequest.query.date,
      accountId: httpRequest.body.user?.accountId
    })
  })

  it('should return 500 if loadTransactionsUseCase.execute throws any error but InvalidParamError', async () => {
    const { sut, loadTransactionsUseCaseStub } = makeSut()
    jest
      .spyOn(loadTransactionsUseCaseStub, 'execute')
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
