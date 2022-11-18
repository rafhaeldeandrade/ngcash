import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'

export class LoadUserAccountBalanceController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.schemaValidate.validate(httpRequest.user)
    if (error) return badRequest(error)
    return Promise.resolve({
      statusCode: 200,
      body: {
        balance: 0
      }
    })
  }
}
