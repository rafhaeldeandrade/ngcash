import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'
import { errorAdapter } from '../helpers/error-adapter'

export class LoadTransactionsController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query } = httpRequest
      const error = await this.schemaValidate.validate(query)
      if (error) return badRequest(error)
      return {
        statusCode: 200,
        body: {}
      }
    } catch (e) {
      return errorAdapter(e as Error)
    }
  }
}
