import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidate
} from '../contracts'

export class LoadTransactionsController implements Controller {
  constructor(private readonly schemaValidate: SchemaValidate) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { query } = httpRequest
    await this.schemaValidate.validate(query)
    return {
      statusCode: 200,
      body: {}
    }
  }
}
