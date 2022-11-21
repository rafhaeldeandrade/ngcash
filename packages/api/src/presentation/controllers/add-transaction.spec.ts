import {
  AddTransaction,
  AddTransactionInput,
  AddTransactionOutput
} from '@/domain/usecases/add-transaction'
import { SchemaValidateStub } from '@/utils/test-stubs'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { HttpRequest, SchemaValidate } from '../contracts'
import { InvalidParamError } from '../errors'
import { AddTransactionController } from './add-transaction'

const fakeUseCaseOutput = {
  from: faker.datatype.uuid(),
  to: faker.datatype.uuid(),
  amountTransacted: new Prisma.Decimal(faker.datatype.number())
}
class AddTransactionUseCaseStub implements AddTransaction {
  async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
    return fakeUseCaseOutput
  }
}

interface SutTypes {
  sut: AddTransactionController
  schemaValidateStub: SchemaValidate
  addTransactionUseCaseStub: AddTransaction
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const addTransactionUseCaseStub = new AddTransactionUseCaseStub()
  const sut = new AddTransactionController(
    schemaValidateStub,
    addTransactionUseCaseStub
  )
  return {
    sut,
    schemaValidateStub,
    addTransactionUseCaseStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      usernameToCashIn: faker.internet.userName(),
      amount: new Prisma.Decimal(faker.datatype.number()),
      user: {
        id: faker.datatype.number()
      }
    }
  }
}

describe('AddTransactionController', () => {
  it('should call schemaValidate.validate with correct params', async () => {
    const { sut, schemaValidateStub } = makeSut()
    const validateSpy = jest.spyOn(schemaValidateStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      usernameToCashIn: httpRequest.body?.usernameToCashIn,
      amount: httpRequest.body?.amount,
      authUserId: httpRequest.body?.user?.id
    })
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

  it('should call addTransactionUseCase.execute with the correct values', async () => {
    const { sut, addTransactionUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(addTransactionUseCaseStub, 'execute')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith({
      usernameToCashIn: httpRequest.body?.usernameToCashIn,
      amount: new Prisma.Decimal(httpRequest.body?.amount),
      authUserId: httpRequest.body?.user?.id
    })
  })

  it('should return 400 if addTransactionUseCase.execute throws InvalidParamError', async () => {
    const { sut, addTransactionUseCaseStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest
      .spyOn(addTransactionUseCaseStub, 'execute')
      .mockRejectedValueOnce(new InvalidParamError('any_field'))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: {
        message: 'any_field is invalid'
      }
    })
  })

  it('should return 500 if addTransactionUseCase.execute throws any error but InvalidParamError', async () => {
    const { sut, addTransactionUseCaseStub } = makeSut()
    jest
      .spyOn(addTransactionUseCaseStub, 'execute')
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

  it('should return 201 with the correct values on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 201,
      body: {
        message: 'Transaction successfully created'
      }
    })
  })
})
