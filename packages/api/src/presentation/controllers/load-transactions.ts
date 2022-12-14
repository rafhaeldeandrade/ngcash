import { LoadTransactions } from '@/domain/usecases/load-transactions'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest, ok } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '../helpers/error-adapter'

export class LoadTransactionsController implements Controller {
  constructor(
    private readonly schemaValidate: SchemaValidate,
    private readonly loadTransactionsUseCase: LoadTransactions
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query, body } = httpRequest
      const error = await this.schemaValidate.validate(query)
      if (error) return badRequest(error)
      const result = await this.loadTransactionsUseCase.execute({
        page: query.page,
        transactionType: query.transactionType,
        date: query.date,
        accountId: body?.user?.accountId
      })
      return ok(result)
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
