import { AddTransaction } from '@/domain/usecases/add-transaction'
import { Prisma } from '@prisma/client'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '../contracts'
import { errorAdapter } from '../helpers/error-adapter'
import { badRequest, created } from '../helpers/http-helper'

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
      return created({
        message: 'Transaction successfully created'
      })
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
