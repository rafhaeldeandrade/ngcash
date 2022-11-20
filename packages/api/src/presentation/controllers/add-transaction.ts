import { AddTransaction } from '@/domain/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '../contracts'
import { errorAdapter } from '../helpers/error-adapter'
import { badRequest } from '../helpers/http-helper'

export class AddTransactionController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly addTransactionUseCase: AddTransaction
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidate.validate({
        usernameToCashIn: httpRequest.body?.usernameToCashIn,
        amount: httpRequest.body?.amount,
        authAccountId: httpRequest.body?.user?.authAccountId
      })
      if (error) return badRequest(error)
      await this.addTransactionUseCase.execute({
        usernameToCashIn: httpRequest.body?.usernameToCashIn,
        amount: new Prisma.Decimal(httpRequest.body?.amount),
        authAccountId: httpRequest.body?.user?.accountId
      })
      return {
        statusCode: 201,
        body: {
          message: 'Transaction added successfully'
        }
      }
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
