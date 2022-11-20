import { SchemaValidateStub } from '@/utils/test-stubs'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { HttpRequest, SchemaValidate } from '../contracts'
import { AddTransactionController } from './add-transaction'

// const fakeUseCaseOutput = {
//   from: faker.datatype.uuid(),
//   to: faker.datatype.uuid(),
//   amountTransacted: new Prisma.Decimal(faker.datatype.number())
// }
// class AddTransactionUseCaseStub implements AddTransaction {
//   async execute(input: AddTransactionInput): Promise<AddTransactionOutput> {
//     return fakeUseCaseOutput
//   }
// }

interface SutTypes {
  sut: AddTransactionController
  schemaValidateStub: SchemaValidate
}

function makeSut(): SutTypes {
  const schemaValidateStub = new SchemaValidateStub()
  const sut = new AddTransactionController(schemaValidateStub)
  return {
    sut,
    schemaValidateStub
  }
}

function makeFakeRequest(): HttpRequest {
  return {
    body: {
      usernameToCashIn: faker.internet.userName(),
      amount: new Prisma.Decimal(faker.datatype.number()),
      user: {
        authAccountId: faker.datatype.number()
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
      authAccountId: httpRequest.body?.user?.authAccountId
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
})
