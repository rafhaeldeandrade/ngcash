import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '@/presentation/contracts'

export class LoadUserAccountBalanceController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidate.validate(httpRequest.user)
    return Promise.resolve({
      statusCode: 200,
      body: {
        balance: 0
      }
    })
  }
}
