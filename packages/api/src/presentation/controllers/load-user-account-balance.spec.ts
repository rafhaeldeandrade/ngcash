import { faker } from '@faker-js/faker'

import { HttpRequest, SchemaValidate } from '@/presentation/contracts'
import { LoadUserAccountBalanceController } from '@/presentation/controllers/load-user-account-balance'
import { SchemaValidateStub } from '@/utils/test-stubs'
import {
  LoadUserAccountBalance,
  LoadUserAccountBalanceInput,
  LoadUserAccountBalanceOutput
} from '@/domain/usecases/load-user-account-balance'
import { AccountNotFoundError } from '@/application/errors'

const fakeBalance = faker.datatype.number()
class LoadUserAccountBalanceUseCaseStub implements LoadUserAccountBalance {
  async execute(
    input: LoadUserAccountBalanceInput
  ): Promise<LoadUserAccountBalanceOutput> {
    return {
      balance: fakeBalance
    }
  }
}

interface SutTypes {
  sut: LoadUserAccountBalanceController
  schemaValidateStub: SchemaValidate
  loadUserAccountBalanceUseCaseStub: LoadUserAccountBalance
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const loadUserAccountBalanceUseCaseStub =
    new LoadUserAccountBalanceUseCaseStub()
  const sut = new LoadUserAccountBalanceController(
    schemaValidateStub,
    loadUserAccountBalanceUseCaseStub
  )
  return {
    sut,
    schemaValidateStub,
    loadUserAccountBalanceUseCaseStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      user: {
        id: faker.datatype.number(),
        accountId: faker.datatype.number()
      }
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
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body.user?.accountId)
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

  it('should call loadUserAccountBalanceUseCase.execute with the correct values', async () => {
    const { sut, loadUserAccountBalanceUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(loadUserAccountBalanceUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body.user?.accountId)
  })

  it('should return 404 if loadUserAccountBalanceUseCase.execute throws AccountNotFoundError', async () => {
    const { sut, loadUserAccountBalanceUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(loadUserAccountBalanceUseCaseStub, 'execute')
      .mockRejectedValueOnce(
        new AccountNotFoundError(httpRequest.user?.accountId as number)
      )
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 404,
      body: {
        message: `Account ${httpRequest.user?.accountId} not found`
      }
    })
  })

  it('should return 500 if loadUserAccountBalanceUseCase.execute throws any error but AccountNotFoundError', async () => {
    const { sut, loadUserAccountBalanceUseCaseStub } = makeSut()
    jest
      .spyOn(loadUserAccountBalanceUseCaseStub, 'execute')
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
        balance: fakeBalance
      }
    })
  })
})
