import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '../contracts'
import { badRequest } from '../helpers/http-helper'

export class AddTransactionController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = await this.schemaValidate.validate({
      usernameToCashIn: httpRequest.body?.usernameToCashIn,
      amount: httpRequest.body?.amount,
      authAccountId: httpRequest.body?.user?.authAccountId
    })
    if (error) return badRequest(error)
    return {
      statusCode: 201,
      body: {
        message: 'Transaction added successfully'
      }
    }
  }
}
