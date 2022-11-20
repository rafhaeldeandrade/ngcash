import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '../contracts'

export class AddTransactionController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidate.validate({
      usernameToCashIn: httpRequest.body?.usernameToCashIn,
      amount: httpRequest.body?.amount,
      authAccountId: httpRequest.body?.user?.authAccountId
    })
    return {
      statusCode: 201,
      body: {
        message: 'Transaction added successfully'
      }
    }
  }
}
